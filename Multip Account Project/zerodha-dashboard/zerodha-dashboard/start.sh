#!/usr/bin/env bash
# Zerodha Multi-Account Dashboard launcher (macOS / Linux)

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "=========================================="
echo " Zerodha Multi-Account Portfolio Dashboard"
echo "=========================================="
echo

if ! command -v node >/dev/null 2>&1; then
  echo "[ERROR] Node.js is not installed."
  echo "Install it from https://nodejs.org and try again."
  exit 1
fi

# Open index.html in default browser
if [[ "$OSTYPE" == "darwin"* ]]; then
  open "$DIR/index.html"
else
  xdg-open "$DIR/index.html" >/dev/null 2>&1 || true
fi

echo "Starting backend proxy on http://localhost:3001 ..."
echo "(Keep this window open while using the dashboard)"
echo
node "$DIR/proxy.js"
