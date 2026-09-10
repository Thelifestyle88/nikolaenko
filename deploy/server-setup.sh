#!/usr/bin/env bash
# Полная настройка голого Ubuntu 22.04
# Запуск: bash deploy/server-setup.sh  (из /var/www/mysite)

set -euo pipefail

APP_DIR="/var/www/mysite"
REPO_URL="https://github.com/Thelifestyle88/nikolaenko.git"
SWAP_SIZE="${SWAP_SIZE:-2G}"

if [ "$(id -u)" -ne 0 ]; then
  echo "Запустите от root: sudo bash deploy/server-setup.sh"
  exit 1
fi

echo "==> System update"
export DEBIAN_FRONTEND=noninteractive
apt update
apt upgrade -y

echo "==> Base packages"
apt install -y curl git nginx ufw ca-certificates gnupg

echo "==> Firewall"
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

echo "==> Swap (для npm run build на маленьком VPS)"
if [ ! -f /swapfile ]; then
  fallocate -l "$SWAP_SIZE" /swapfile || dd if=/dev/zero of=/swapfile bs=1M count=2048
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
  echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

echo "==> Node.js 20"
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
node -v
npm -v

echo "==> PM2"
npm install -g pm2

echo "==> Clone project"
mkdir -p /var/www
if [ ! -d "$APP_DIR/.git" ]; then
  git clone "$REPO_URL" "$APP_DIR"
fi

cd "$APP_DIR"
chmod +x scripts/deploy.sh

echo "==> Build app"
npm ci
npm run build

echo "==> Start app with PM2"
pm2 delete mysite 2>/dev/null || true
pm2 start npm --name mysite -- start
pm2 save
env PATH="$PATH:/usr/bin" pm2 startup systemd -u root --hp /root
pm2 save

echo "==> Nginx"
cp deploy/nginx.conf /etc/nginx/sites-available/mysite
ln -sf /etc/nginx/sites-available/mysite /etc/nginx/sites-enabled/mysite
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl enable nginx
systemctl restart nginx

echo "==> Certbot (SSL)"
apt install -y certbot python3-certbot-nginx

echo ""
echo "============================================"
echo "  Сервер готов!"
echo "============================================"
echo ""
echo "Сайт по IP:    http://31.77.143.202"
echo "Папка проекта: $APP_DIR"
echo ""
echo "Дальше:"
echo "1. DNS A-записи @ и www -> 31.77.143.202"
echo "2. SSL: certbot --nginx -d nikolainikolaenkodev.ru -d www.nikolainikolaenkodev.ru"
echo "3. GitHub Secrets для автодеплоя: SERVER_HOST, SERVER_USER, SERVER_SSH_KEY"
echo ""
