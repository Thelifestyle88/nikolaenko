import {
  getPersonJsonLd,
  getProfilePageJsonLd,
  getWebSiteJsonLd,
} from '@/lib/seo/json-ld';
import type { SiteLocale } from '@/config/site';

type JsonLdProps = {
  locale: SiteLocale;
};

export function JsonLd({ locale }: JsonLdProps) {
  const data = [getPersonJsonLd(locale), getWebSiteJsonLd(locale), getProfilePageJsonLd(locale)];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
