#!/usr/bin/env bash
# Run ON THE SERVER from the repo folder to publish the latest code:
#   cd ~/sga && bash deploy/update.sh
# Pulls, installs, builds into dist-next, swaps it in, then (re)starts the pm2 app "sga".
set -euo pipefail

cd "$(dirname "$0")/.."
PORT="${SGA_PORT:-3001}"   # must match proxy_pass in deploy/nginx-sgaingredients.conf

echo "==> Pulling latest code"
git pull --ff-only

echo "==> Installing dependencies"
npm ci --no-audit --no-fund

echo "==> Building"
# Build to a separate folder so the live site keeps working until the new build is ready.
npx tsc --noEmit
npx vite build --outDir dist-next --emptyOutDir
rm -rf dist
mv dist-next dist

echo "==> Restarting pm2 app 'sga'"
if pm2 describe sga >/dev/null 2>&1; then
  pm2 restart sga
else
  pm2 serve "$PWD/dist" "$PORT" --spa --name sga
fi
pm2 save

echo "==> Live on port $PORT: https://sgaingredients.com"
