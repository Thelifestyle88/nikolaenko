# Голый Ubuntu 22.04 → сайт на 31.77.143.202

## Шаг 1. Подключиться

```bash
ssh root@31.77.143.202
```

(логин/пароль из reg.ru)

---

## Шаг 2. Склонировать и установить всё одной командой

```bash
apt update && apt install -y git
git clone https://github.com/Thelifestyle88/nikolaenko.git /var/www/mysite
cd /var/www/mysite
bash deploy/server-setup.sh
```

Скрипт установит: Node.js 20, PM2, nginx, ufw, swap, соберёт проект и запустит сайт.

Проверка: открыть **http://31.77.143.202**

---

## Шаг 3. DNS (reg.ru)

| Тип | Имя | Значение |
|-----|-----|----------|
| A | `@` | `31.77.143.202` |
| A | `www` | `31.77.143.202` |

Подождать 15–60 минут.

---

## Шаг 4. SSL (бесплатно)

```bash
certbot --nginx -d nikolainikolaenkodev.ru -d www.nikolainikolaenkodev.ru
```

Email для уведомлений → согласиться с условиями → redirect HTTP→HTTPS: **2 (Yes)**

---

## Шаг 5. Автодеплой (опционально)

GitHub → репозиторий `nikolaenko` → **Settings → Secrets → Actions**:

| Secret | Значение |
|--------|----------|
| `SERVER_HOST` | `31.77.143.202` |
| `SERVER_USER` | `root` |
| `SERVER_SSH_KEY` | содержимое приватного ключа `~/.ssh/id_rsa` |

Сгенерировать ключ на своём ПК (если нет):

```bash
ssh-keygen -t ed25519 -C "deploy"
```

Публичный ключ добавить на сервер:

```bash
ssh root@31.77.143.202
mkdir -p ~/.ssh
echo "ВАШ_ПУБЛИЧНЫЙ_КЛЮЧ" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

После push в `main` сайт обновится сам.

---

## Полезные команды на сервере

```bash
pm2 status              # статус приложения
pm2 logs mysite          # логи
cd /var/www/mysite && bash scripts/deploy.sh   # ручной деплой
systemctl status nginx   # статус nginx
```
