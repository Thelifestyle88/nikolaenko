#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/mysite}"
BRANCH="${BRANCH:-main}"

cd "$APP_DIR"

echo "==> Fetch latest code ($BRANCH)"
git fetch origin "$BRANCH"
git reset --hard "origin/$BRANCH"

echo "==> Install dependencies"
npm ci

echo "==> Build"
npm run build

echo "==> Restart app"
if pm2 describe mysite >/dev/null 2>&1; then
  pm2 restart mysite
else
  pm2 start npm --name mysite -- start
fi

pm2 save

echo "==> Deploy finished"
