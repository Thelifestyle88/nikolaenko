import type { Metadata, Viewport } from 'next';
import { siteConfig } from '@/config/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name.ru} — ${siteConfig.role.ru}`,
    template: `%s | ${siteConfig.name.ru}`,
  },
  applicationName: siteConfig.name.ru,
  icons: {
    icon: [
      { url: '/icons/favicon.svg', type: 'image/svg+xml' },
      { url: '/icons/favicon.ico', sizes: 'any' },
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      {
        url: '/icons/apple-touch-icon-180x180.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        url: '/icons/apple-touch-icon-ipad-167x167.png',
        sizes: '167x167',
        type: 'image/png',
      },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/icons/safari-pinned-tab.svg',
        color: '#0ea5ff',
      },
    ],
  },
  manifest: '/icons/site.webmanifest',
  other: {
    'msapplication-config': '/icons/browserconfig.xml',
    'msapplication-TileColor': '#020817',
  },
};

export const viewport: Viewport = {
  themeColor: '#020817',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
