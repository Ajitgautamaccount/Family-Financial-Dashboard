# Multi-Account Portfolio Dashboard (Zerodha Kite Connect)

A lightweight, browser-based dashboard to view **funds, margins, positions and live P/L**
across **multiple Zerodha accounts** from one screen.

> No data leaves your machine. Calls to Kite are forwarded by a tiny local Node.js proxy
> (required only because browsers block direct cross-origin calls to `api.kite.trade`).

---

## 📁 Project structure

```
zerodha-dashboard/
├── index.html      ← the dashboard UI (open in browser)
├── proxy.js        ← local Node.js backend proxy
├── start.bat       ← one-click launcher (Windows)
├── start.sh        ← one-click launcher (macOS / Linux)
└── README.md       ← this file
```

---

## 🔧 Prerequisites

1. **Node.js (LTS)** — download from https://nodejs.org  
   Verify install:
   ```
   node --version
   ```

2. A **Kite Connect** app (per Zerodha account) at  
   https://developers.kite.trade/apps  
   You'll get an **API Key** and **API Secret** for each.

---

## ▶️ Running

### Windows
Double-click **`start.bat`**. It will:
1. Open `index.html` in your default browser
2. Start the proxy on `http://localhost:3001`

### macOS / Linux
```
chmod +x start.sh
./start.sh
```

### Manual (any OS)
```
node proxy.js
```
Then open `index.html` in your browser.

When the proxy is up, the red banner at the top of the dashboard will turn green
(**Proxy: Running**).

---

## ➕ Adding an account

1. Click **➕ Add Account**.
2. Enter:
   - **Account Name** — any label you like (e.g. *Primary*, *HUF*, *Wife*)
   - **API Key** and **API Secret** from your Kite Connect app
3. Click **Save**.
4. Click **Login** on the new account card.
5. A Kite login window opens in a new tab. After login, Zerodha redirects to your
   app's *Redirect URL* with `request_token=XXXXX` in the URL.
6. Copy that `request_token`, paste it back into the dashboard prompt, click
   **Generate Session**.
7. ✅ That account is now live. Repeat for other accounts.

The dashboard auto-refreshes every 30 seconds.

---

## 🔐 Security notes

- All credentials (API key, secret, access token) are stored **only in your browser's
  `localStorage`** on this machine.
- The proxy runs on `localhost` and forwards requests directly to
  `https://api.kite.trade`. Nothing is logged, nothing is sent to any third party.
- Kite Connect access tokens expire **daily at ~6 AM IST**. Just click **Login**
  again the next day.

---

## 🛠 Troubleshooting

| Problem | Fix |
|---|---|
| Banner stays red / "Not running" | Make sure the terminal window with `node proxy.js` is still open. |
| `Error: listen EADDRINUSE :::3001` | Port already in use. Change `PORT = 3001` in `proxy.js` to e.g. `3002`, and change `PROXY_URL` at the top of the `<script>` in `index.html` to match. |
| Windows firewall pops up | Click **Allow** for Node.js (private network is enough). |
| Login says *Invalid checksum* | Double-check the API Secret you saved — must match the Kite app exactly. |
| Positions empty but logged in | You may not have intraday positions today; holdings are a different endpoint. |

---

## 🧩 Customisation

- Change refresh frequency: edit `setInterval(..., 30000)` at the bottom of `index.html`.
- Add **holdings** support: add a new endpoint call to `/kite/portfolio/holdings`
  inside `refreshAccount()` and render in a new section.

Happy trading 📈
