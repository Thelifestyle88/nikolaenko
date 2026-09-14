import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { siteConfig } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.map((locale) => ({
    url: `${siteConfig.url}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: locale === routing.defaultLocale ? 1 : 0.9,
    alternates: {
      languages: {
        ...Object.fromEntries(
          routing.locales.map((item) => [item, `${siteConfig.url}/${item}`])
        ),
        'x-default': `${siteConfig.url}/${routing.defaultLocale}`,
      },
    },
  }));
}
