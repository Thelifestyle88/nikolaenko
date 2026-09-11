import { siteConfig, type SiteLocale } from '@/config/site';

export function getPersonJsonLd(locale: SiteLocale) {
  const personName = siteConfig.name[locale];

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personName,
    alternateName: siteConfig.alternateNames,
    jobTitle: siteConfig.role[locale],
    url: `${siteConfig.url}/${locale}`,
    email: siteConfig.email,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    sameAs: [siteConfig.github, siteConfig.linkedin, siteConfig.telegram],
    knowsAbout: [
      'React',
      'TypeScript',
      'Next.js',
      'Redux Toolkit',
      'WebSocket',
      'Frontend Development',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'PUSK LLC',
    },
  };
}

export function getWebSiteJsonLd(locale: SiteLocale) {
  const personName = siteConfig.name[locale];

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${personName} — Portfolio`,
    alternateName: siteConfig.alternateNames,
    url: siteConfig.url,
    inLanguage: [siteConfig.locale.ru, siteConfig.locale.en],
    publisher: {
      '@type': 'Person',
      name: personName,
    },
  };
}

export function getProfilePageJsonLd(locale: SiteLocale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: siteConfig.name[locale],
    url: `${siteConfig.url}/${locale}`,
    mainEntity: getPersonJsonLd(locale),
  };
}
