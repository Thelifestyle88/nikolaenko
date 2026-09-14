'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';

const METRIKA_ID = 112577910;

declare global {
  interface Window {
    ym: (...args: unknown[]) => void;
  }
}

export function YandexMetrika() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams?.toString();
    const url = pathname + (query ? `?${query}` : '');

    if (typeof window.ym === 'function') {
      window.ym(METRIKA_ID, 'hit', url);
    }
  }, [pathname, searchParams]);

  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`
          (function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
          })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${METRIKA_ID}', 'ym');

          ym(${METRIKA_ID}, 'init', {
            ssr:true,
            webvisor:true,
            clickmap:true,
            ecommerce:"dataLayer",
            referrer: document.referrer,
            url: location.href,
            accurateTrackBounce:true,
            trackLinks:true
          });
        `}
      </Script>
      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${METRIKA_ID}`}
            style={{ position: 'absolute', left: '-9999px' }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}
