export const siteConfig = {
  url: 'https://nikolainikolaenkodev.ru',
  name: {
    ru: 'Николаенко Николай',
    en: 'Nick Nikolaenko',
  },
  alternateNames: [
    'Николаенко Николай',
    'Николай Николаенко',
    'Nick Nikolaenko',
    'Nikolai Nikolaenko',
    'Nikolaenko Nikolai',
  ],
  role: {
    ru: 'Senior Frontend-разработчик',
    en: 'Senior Frontend Engineer',
  },
  email: 'nikonikolaenko88@gmail.com',
  telegram: 'https://t.me/Thelifestyle88',
  github: 'https://github.com/Thelifestyle88',
  linkedin: 'https://ru.linkedin.com/in/nick-nikolaenko-aa4b5083',
  ogImage: '/images/avater.jpg',
  locale: {
    ru: 'ru_RU',
    en: 'en_US',
  },
} as const;

export type SiteLocale = keyof typeof siteConfig.role;
