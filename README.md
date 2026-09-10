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

## Деплой на Vercel

1. Запушить репозиторий на GitHub
2. На [vercel.com](https://vercel.com) подключить репозиторий — Vercel определит Next.js автоматически
3. При необходимости добавить свой домен в **Settings → Domains**

Каждый push в `main` запускает деплой. Pull Request'ы получают preview-URL.

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
