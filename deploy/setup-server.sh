#!/usr/bin/env bash
# One-time server setup for sgaingredients.com. Run ON THE SERVER from the repo folder:
#   cd ~/sga && CERTBOT_EMAIL=you@example.com bash deploy/setup-server.sh
# Adds a new nginx site next to the existing ones (nothing else is changed),
# makes pm2 start on boot, and gets an HTTPS certificate with certbot once DNS points here.
# Safe to re-run.
set -euo pipefail

DOMAIN=sgaingredients.com
SITE=/etc/nginx/sites-available/$DOMAIN
CONF="$(cd "$(dirname "$0")" && pwd)/nginx-sgaingredients.conf"

echo "==> Installing nginx site for $DOMAIN"
if sudo test -f "$SITE" && sudo grep -q "managed by Certbot" "$SITE"; then
  echo "Existing site already has HTTPS from certbot; leaving it unchanged."
else
  sudo install -m 644 "$CONF" "$SITE"
fi
sudo ln -sfn "$SITE" "/etc/nginx/sites-enabled/$DOMAIN"
if ! sudo nginx -t; then
  sudo rm -f "/etc/nginx/sites-enabled/$DOMAIN"
  echo "nginx config test failed — the new site was removed and nginx was NOT reloaded." >&2
  exit 1
fi
sudo systemctl reload nginx

echo "==> Making pm2 start on boot"
PM2_BIN="$(command -v pm2)"
NODE_DIR="$(dirname "$(command -v node)")"
sudo env PATH="$PATH:$NODE_DIR" "$PM2_BIN" startup systemd -u "$USER" --hp "$HOME" >/dev/null

echo "==> HTTPS certificate"
if sudo test -d "/etc/letsencrypt/live/$DOMAIN"; then
  echo "Certificate already exists; certbot renews it automatically."
else
  if ! command -v certbot >/dev/null 2>&1; then
    sudo apt-get update
    sudo apt-get install -y certbot python3-certbot-nginx
  fi
  public_ip="$(curl -s4 https://checkip.amazonaws.com || true)"
  resolved="$(getent ahostsv4 "$DOMAIN" | awk 'NR==1 {print $1}' || true)"
  if [ -n "$public_ip" ] && [ "$resolved" = "$public_ip" ]; then
    if [ -n "${CERTBOT_EMAIL:-}" ]; then account=(-m "$CERTBOT_EMAIL"); else account=(--register-unsafely-without-email); fi
    sudo certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" --non-interactive --agree-tos --redirect "${account[@]}"
  else
    echo "Skipped: $DOMAIN resolves to '${resolved:-nothing}', this server is '$public_ip'."
    echo "When the domain is live (Cloudflare record grey / DNS only), run this script again."
  fi
fi

echo "==> Setup done."
