// proxy.js v2 - Local backend for Zerodha Multi-Account Dashboard
// Run with: node proxy.js
//
// NEW in v2:
//  - Catches Kite redirect at "/" and shows a friendly success page
//  - Exposes GET /last-token so the dashboard can auto-pick the token

const http  = require('http');
const https = require('https');
const url   = require('url');

const PORT = 3001;
const KITE_HOST       = 'api.kite.trade';
const KITE_LOGIN_HOST = 'kite.zerodha.com';

// In-memory store for the most recent request_token captured from Kite redirect
let lastRequestToken = null;
let lastRequestTokenAt = 0;

function setCORS(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-Kite-Version, X-User-Id, X-Access-Token, X-Api-Key');
}

function forwardToKite(req, res, targetHost, targetPath) {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    const apiKey      = req.headers['x-api-key']      || '';
    const accessToken = req.headers['x-access-token'] || '';

    const headers = {
      'X-Kite-Version': '3',
      'Content-Type'  : req.headers['content-type'] || 'application/x-www-form-urlencoded',
      'User-Agent'    : 'Mozilla/5.0'
    };
    if (apiKey) headers['Authorization'] = `token ${apiKey}:${accessToken}`;

    const options = { host: targetHost, path: targetPath, method: req.method, headers };

    const proxyReq = https.request(options, proxyRes => {
      let data = '';
      proxyRes.on('data', chunk => data += chunk);
      proxyRes.on('end', () => {
        setCORS(res);
        res.writeHead(proxyRes.statusCode, { 'Content-Type': 'application/json' });
        res.end(data);
      });
    });

    proxyReq.on('error', err => {
      setCORS(res);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'error', message: err.message }));
    });

    if (body) proxyReq.write(body);
    proxyReq.end();
  });
}

// Pretty success page shown after Kite redirects back with request_token
function loginSuccessPage(token) {
  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>Login Successful</title>
<style>
  body{margin:0;font-family:-apple-system,Segoe UI,Roboto,sans-serif;
       background:#0b0d12;color:#e6e9ef;min-height:100vh;
       display:flex;align-items:center;justify-content:center}
  .card{background:#12151c;border:1px solid #222836;border-radius:14px;
        padding:32px 36px;max-width:520px;width:90%;text-align:center}
  h1{margin:0 0 6px;font-size:26px;
     background:linear-gradient(90deg,#22c55e,#10b981);
     -webkit-background-clip:text;background-clip:text;color:transparent}
  p{color:#8b93a7;font-size:14px;line-height:1.5}
  .token{margin:18px 0;padding:14px;background:#000;border:1px solid #222836;
         border-radius:8px;font-family:ui-monospace,Menlo,Consolas,monospace;
         font-size:13px;word-break:break-all;color:#a7f3d0}
  button{background:#3b82f6;color:#fff;border:none;padding:10px 18px;
         border-radius:8px;font-size:14px;cursor:pointer;margin:4px}
  button:hover{filter:brightness(1.1)}
  .ok{color:#22c55e;font-weight:600}
  .hint{font-size:12px;color:#8b93a7;margin-top:18px}
</style></head>
<body>
  <div class="card">
    <h1>✅ Login successful!</h1>
    <p>Zerodha sent us your <strong>request_token</strong>.<br>
    The dashboard will pick it up automatically — you can usually just close this tab.</p>

    <div class="token" id="tok">${token}</div>

    <button onclick="navigator.clipboard.writeText('${token}').then(()=>this.textContent='Copied ✓')">
      📋 Copy token
    </button>
    <button onclick="window.close()">Close tab</button>

    <p class="hint">If the dashboard doesn't auto-fill, paste the token manually into the Login dialog.</p>
  </div>
</body></html>`;
}

const server = http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    setCORS(res);
    res.writeHead(204);
    return res.end();
  }

  const parsed = url.parse(req.url, true);
  const path   = parsed.pathname;
  const query  = parsed.query || {};

  // --- 1. Kite redirect handler ---------------------------------
  // Kite Connect redirect URL should be set to: http://localhost:3001
  // It will call back here with ?request_token=...&status=success
  if (path === '/' && query.request_token) {
    lastRequestToken   = query.request_token;
    lastRequestTokenAt = Date.now();
    console.log(`🎯 Captured request_token: ${lastRequestToken.slice(0,8)}…`);
    setCORS(res);
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(loginSuccessPage(lastRequestToken));
  }

  // --- 2. Poll endpoint for dashboard ---------------------------
  if (path === '/last-token') {
    setCORS(res);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    // Only return tokens captured in the last 2 minutes
    const fresh = lastRequestToken && (Date.now() - lastRequestTokenAt) < 120000;
    return res.end(JSON.stringify({
      token: fresh ? lastRequestToken : null,
      age_ms: fresh ? (Date.now() - lastRequestTokenAt) : null
    }));
  }

  // Optional: clear captured token after dashboard consumed it
  if (path === '/clear-token') {
    lastRequestToken = null;
    setCORS(res);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ status: 'ok' }));
  }

  // --- 3. Health check ------------------------------------------
  if (path === '/health' || path === '/ping') {
    setCORS(res);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ status: 'ok', message: 'Proxy running', version: 2 }));
  }

  // --- 4. Kite API forward --------------------------------------
  if (path.startsWith('/kite/')) {
    const targetPath = path.replace('/kite', '') + (parsed.search || '');
    return forwardToKite(req, res, KITE_HOST, targetPath);
  }
  if (path.startsWith('/login/')) {
    const targetPath = path.replace('/login', '') + (parsed.search || '');
    return forwardToKite(req, res, KITE_LOGIN_HOST, targetPath);
  }

  // --- 5. Default -----------------------------------------------
  setCORS(res);
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'error', message: 'Unknown endpoint' }));
});

server.listen(PORT, () => {
  console.log(`✅ Zerodha Proxy v2 running at http://localhost:${PORT}`);
  console.log(`   Health check:     http://localhost:${PORT}/health`);
  console.log(`   Kite API:         http://localhost:${PORT}/kite/...`);
  console.log(`   Kite redirect to: http://localhost:${PORT}   (set this as Redirect URL in your Kite app)`);
  console.log(`\nKeep this window open while using the dashboard.`);
});
