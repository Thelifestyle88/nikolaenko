# Nick Nikolaenko — Portfolio

Личный сайт-визитка frontend-разработчика на **Next.js 16 + TypeScript + CSS Modules**.

Двуязычная версия (RU/EN) с тёмной и светлой темой. Контент синхронизирован с резюме: опыт, даты, контакты.

## Что на сайте

- **Hero** — приветствие с typewriter-анимацией, фото, кнопки «Смотреть проекты» и «Скачать резюме»
- **About** — стек технологий и навыки (код-ревью, архитектура, оптимизация и др.)
- **Projects** — коммерческие проекты с описанием, скриншотами и lightbox-галереей:
  - PUSK LLC — АРМ диспетчера (3 проекта: пропускной пункт, бесконтактные пункты, АСУДД)
  - BugBounty.ru — лендинг и админ-панель
- **Experience** — опыт работы (PUSK LLC, BugBounty.ru)
- **Contacts** — email, Telegram, GitHub, LinkedIn, скачивание резюме
- **Header** — навигация, переключатели языка и темы, логотип
- **Footer** — соцсети и копирайт

## Стек

- **Next.js 16** (App Router)
- **TypeScript**
- **CSS Modules**
- **next-intl** — локализация RU/EN
- **next-themes** — светлая/тёмная тема
- **framer-motion** — анимации
- **react-icons** — иконки

## Контент и ассеты

| Что | Где |
|-----|-----|
| Тексты RU/EN | `messages/ru.json`, `messages/en.json` |
| Контакты | `src/components/Contacts/Contacts.tsx`, `src/components/Footer/Footer.tsx` |
| Резюме EN | `public/Nick_Nikolaenko_Frontend_Developer_CV_main.docx` |
| Резюме RU | `public/resume_ru.pdf` |
| Логотип в header | `public/images/nick_logo_only_transparent.svg` |
| Favicon / PWA-иконки | `public/icons/` (из пака `public/nick_logo_site_icons/`) |
| Фото, скриншоты проектов | `public/images/` |

## Локальная разработка

```bash
npm install
npm run dev
```

Открыть [http://localhost:3000](http://localhost:3000).

## Деплой на VPS (31.77.143.202)

### 1. Первичная настройка сервера (один раз)

Подключиться по SSH:

```bash
ssh root@31.77.143.202
```

На сервере:

```bash
git clone https://github.com/Thelifestyle88/nikolaenko.git /var/www/mysite
cd /var/www/mysite
bash deploy/server-setup.sh
```

### 2. DNS

В reg.ru для домена `nikolainikolaenkodev.ru`:

| Тип | Имя | Значение |
|-----|-----|----------|
| A | `@` | `31.77.143.202` |
| A | `www` | `31.77.143.202` |

### 3. Бесплатный SSL (Let's Encrypt)

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d nikolainikolaenkodev.ru -d www.nikolainikolaenkodev.ru
```

### 4. Автодеплой при push в `main`

В GitHub → **Settings → Secrets and variables → Actions** добавить:

| Secret | Значение |
|--------|----------|
| `SERVER_HOST` | `31.77.143.202` |
| `SERVER_USER` | `root` (или ваш пользователь) |
| `SERVER_SSH_KEY` | приватный SSH-ключ |

Workflow: `.github/workflows/deploy.yml` — при каждом push в `main` запускает `scripts/deploy.sh` на сервере.

Ручной деплой на сервере:

```bash
cd /var/www/mysite && bash scripts/deploy.sh
```

### Файлы деплоя

- `scripts/deploy.sh` — pull, build, pm2 restart
- `deploy/nginx.conf` — конфиг nginx
- `deploy/server-setup.sh` — первичная установка
- `.github/workflows/deploy.yml` — CI/CD

## Структура проекта

```
src/
├── app/
│   ├── [locale]/        # страницы с локализацией
│   │   ├── layout.tsx   # layout, шрифты, Yandex Metrika
│   │   └── page.tsx     # главная страница
│   ├── layout.tsx       # metadata, favicon, web manifest
│   └── globals.css      # CSS-переменные и темы
├── components/
│   ├── Header/          # навигация, логотип, RU/EN, тема
│   ├── Hero/            # главный экран
│   ├── About/           # стек и навыки
│   ├── Projects/        # проекты и галерея
│   ├── Experience/      # опыт работы
│   ├── Contacts/        # контакты и резюме
│   ├── Footer/
│   └── ui/              # Button, Section, Typewriter, ThemeProvider и др.
├── i18n/
└── middleware.ts
messages/
├── ru.json
└── en.json
public/
├── icons/               # favicon, apple-touch, PWA
├── images/              # фото, логотип, скриншоты
└── nick_logo_site_icons/ # исходный пак иконок
```
