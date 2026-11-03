# Deploying to sgaingredients.com (AWS Lightsail + Cloudflare)

Same workflow as nailpalms: the code is in a Git repo, and on the server you `git pull`, build and serve the
`dist/` folder with **pm2** on port 3001 (app name `sga`). The server's existing **nginx** (ports 80/443) gets one
extra site that forwards sgaingredients.com to pm2, and **certbot** adds HTTPS. Existing nginx sites are not changed.

- Server: Lightsail `Node-js-1`, London, `3.10.221.177` / `2a05:d01c:9d0:b100:8a11:1090:affa:aba3`, user `admin`
- Domain: `sgaingredients.com` (DNS at Cloudflare)

> The public IP is not static. **Reboot** keeps it; **Stop → Start** changes it. If it changes, update the
> Cloudflare A/AAAA records.

---

## 1. Lightsail: open HTTPS

Lightsail → `Node-js-1` → **Networking**: under both **IPv4 Firewall** and **IPv6 Firewall**,
allow **HTTP (80)** and **HTTPS (443)**.

## 2. Cloudflare: point the domain at the server

Cloudflare → `sgaingredients.com` → **DNS → Records**, all **DNS only** (grey cloud) for now:

| Type  | Name  | Content                                   |
|-------|-------|-------------------------------------------|
| A     | `@`   | `3.10.221.177`                            |
| AAAA  | `@`   | `2a05:d01c:9d0:b100:8a11:1090:affa:aba3`  |
| CNAME | `www` | `sgaingredients.com`                      |

The domain must show **Active** under *Domain Registration*. Check with `nslookup sgaingredients.com 1.1.1.1`.

## 3. Push the code to GitHub (on your PC)

Create an empty **private** repo on GitHub (e.g. `sga-website`), then in the project folder:

```bash
git init -b main
git add .
git commit -m "Al Shagara website"
git remote add origin https://github.com/<you>/sga-website.git
git push -u origin main
```

## 4. First time on the server

SSH in (browser SSH in Lightsail is fine), then:

```bash
cd ~
git clone https://github.com/<you>/sga-website.git sga
cd sga
bash deploy/update.sh                                        # install, build, start pm2 app "sga"
CERTBOT_EMAIL=you@example.com bash deploy/setup-server.sh    # nginx site + HTTPS + pm2 on boot
```

`setup-server.sh`:
1. adds [deploy/nginx-sgaingredients.conf](deploy/nginx-sgaingredients.conf) as a new nginx site. It runs `nginx -t` first and backs out if the test fails, so the other site is safe,
2. sets pm2 to start on boot,
3. gets the HTTPS certificate with certbot, but only once the domain points at this server. Otherwise it skips this step and you run the script again later.

(The email gets Let's Encrypt expiry notices; you can leave out `CERTBOT_EMAIL=…`.)

Open **https://sgaingredients.com**.

## 5. Cloudflare: turn on the proxy

Once HTTPS works:

1. **SSL/TLS → Overview** → set the encryption mode to **Full (strict)**. *(Do not use "Flexible": it causes redirect loops.)*
2. **DNS** → switch the A, AAAA and `www` records to **Proxied** (orange cloud).

## Updating the site

On your PC: commit and `git push`. Then on the server:

```bash
cd ~/sga && bash deploy/update.sh
```

It pulls, installs, builds into a temporary folder (the live site keeps working meanwhile), swaps it in and restarts pm2.

Useful pm2 commands: `pm2 list`, `pm2 logs sga`, `pm2 restart sga`.
Run pm2 as `admin`, **without `sudo`**, because `sudo pm2` shows root's separate, empty list.

## Contact forms

The forms only *pretend* to send until an endpoint is configured. The simplest option is [Formspree](https://formspree.io):
create a form, then on the server create `~/sga/.env`:

```
VITE_ENQUIRY_ENDPOINT=https://formspree.io/f/xxxxxxx
```

and run `bash deploy/update.sh`. The value is baked in at build time. `.env` is git-ignored, so it stays on the server.

## Troubleshooting

| Symptom | Check |
|---|---|
| Browser times out | Lightsail firewall has 80 and 443 open; DNS points at the current IP |
| `502 Bad Gateway` | pm2 app isn't running: `pm2 list`, `pm2 logs sga` |
| `ERR_TOO_MANY_REDIRECTS` | Cloudflare SSL mode must be **Full (strict)**, not Flexible |
| Shows the other site instead | `ls /etc/nginx/sites-enabled` must include `sgaingredients.com`; `sudo nginx -t && sudo systemctl reload nginx` |
| certbot fails | Records must be **grey** (DNS only) during setup; `sudo tail -50 /var/log/letsencrypt/letsencrypt.log` |
| Build killed / out of memory | 512 MB is tight; add swap once: `sudo fallocate -l 1G /swapfile && sudo chmod 600 /swapfile && sudo mkswap /swapfile && sudo swapon /swapfile && echo '/swapfile none swap sw 0 0' \| sudo tee -a /etc/fstab` |
| Old version still shows | Cloudflare → **Caching → Purge Everything** |
