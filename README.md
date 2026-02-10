# Portfolio — Frontend Developer

Сайт-визитка на **Next.js 15 + TypeScript + CSS Modules**.

## Стек

- **Next.js** (App Router, SSR)
- **TypeScript**
- **CSS Modules**
- **next-intl** — интернационализация (RU/EN)
- **next-themes** — переключатель тем (светлая/тёмная)
- **framer-motion** — анимации
- **react-icons** — иконки

## Локальная разработка

```bash
npm install
npm run dev
```

Открыть [http://localhost:3000](http://localhost:3000).

## Деплой на Vercel

### Шаг 1: Создать GitHub-репозиторий

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Шаг 2: Подключить Vercel

1. Зайти на [vercel.com](https://vercel.com) и авторизоваться через GitHub
2. Нажать **"Add New Project"**
3. Выбрать ваш репозиторий
4. Vercel автоматически определит Next.js — просто нажать **"Deploy"**
5. Через 1-2 минуты сайт будет доступен по адресу `your-project.vercel.app`

### Шаг 3: Подключить свой домен

1. В настройках проекта на Vercel перейти в **Settings → Domains**
2. Добавить свой домен (например, `yourname.dev`)
3. Vercel покажет DNS-записи, которые нужно прописать у регистратора домена:
   - **A-запись**: `76.76.21.21`
   - Или **CNAME**: `cname.vercel-dns.com`
4. SSL-сертификат выдаётся автоматически

### CI/CD

Каждый `git push` в ветку `main` автоматически запускает новый деплой.
Pull Request'ы получают отдельный preview-URL для тестирования.

## Структура проекта

```
src/
├── app/
│   ├── [locale]/        # страницы с локализацией
│   │   ├── layout.tsx   # layout с провайдерами
│   │   └── page.tsx     # главная страница
│   ├── layout.tsx       # root layout
│   └── globals.css      # глобальные стили и CSS-переменные
├── components/
│   ├── Header/          # навигация + переключатели
│   ├── Hero/            # главный экран
│   ├── About/           # стек технологий
│   ├── Projects/        # проекты
│   ├── Experience/      # опыт работы
│   ├── Contacts/        # контакты
│   ├── Footer/          # подвал
│   └── ui/              # переиспользуемые компоненты
├── i18n/                # конфигурация локализации
└── middleware.ts        # middleware для i18n
messages/
├── ru.json              # переводы RU
└── en.json              # переводы EN
```

## Кастомизация

- **Имя и контакты**: замените заглушки в `messages/ru.json` и `messages/en.json`
- **Ссылки соцсетей**: обновите в `src/components/Contacts/Contacts.tsx` и `src/components/Footer/Footer.tsx`
- **Резюме**: добавьте файлы `public/resume-ru.pdf` и `public/resume-en.pdf`
- **Фото**: добавьте изображения в `public/images/`
