import type { Metadata } from 'next';
import { siteConfig, type SiteLocale } from '@/config/site';

export function getPageMetadata(locale: SiteLocale): Metadata {
  const isRu = locale === 'ru';
  const personName = siteConfig.name[locale];
  const role = siteConfig.role[locale];
  const title = `${personName} — ${role}`;
  const description = isRu
    ? `${siteConfig.name.ru} — портфолио Senior Frontend-разработчика. React, TypeScript, real-time системы, опыт в PUSK и BugBounty.ru. Резюме, проекты и контакты.`
    : `${siteConfig.name.en} (Nikolai Nikolaenko) — Senior Frontend Engineer portfolio. React, TypeScript, real-time systems, toll road dispatch systems, resume and contacts.`;
  const keywords = isRu
    ? [
        'Николаенко Николай',
        'Николай Николаенко',
        'Nikolaenko Nikolai',
        'Nick Nikolaenko',
        'frontend разработчик',
        'React разработчик',
        'TypeScript',
        'портфолио разработчика',
        'Senior Frontend',
        'nikolainikolaenkodev.ru',
      ]
    : [
        'Nick Nikolaenko',
        'Nikolai Nikolaenko',
        'Nikolaenko Nikolai',
        'Николаенко Николай',
        'frontend developer',
        'React developer',
        'TypeScript portfolio',
        'Senior Frontend Engineer',
        'nikolainikolaenkodev.ru',
      ];

  const pageUrl = `${siteConfig.url}/${locale}`;

  return {
    title,
    description,
    keywords,
    authors: [{ name: personName, url: siteConfig.url }],
    creator: personName,
    publisher: personName,
    alternates: {
      canonical: pageUrl,
      languages: {
        ru: `${siteConfig.url}/ru`,
        en: `${siteConfig.url}/en`,
      },
    },
    openGraph: {
      type: 'website',
      locale: siteConfig.locale[locale],
      url: pageUrl,
      siteName: `${personName} — Portfolio`,
      title,
      description,
      images: [
        {
          url: siteConfig.ogImage,
          width: 340,
          height: 340,
          alt: personName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [siteConfig.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    category: 'technology',
  };
}
