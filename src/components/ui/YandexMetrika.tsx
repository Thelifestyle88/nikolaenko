'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const METRIKA_ID = 106763646;

declare global {
  interface Window {
    ym: (...args: unknown[]) => void;
  }
}

export function YandexMetrika() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    if (typeof window.ym === 'function') {
      window.ym(METRIKA_ID, 'hit', url);
    }
  }, [pathname, searchParams]);

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window,document,'script','https://mc.yandex.ru/metrika/tag.js?id=${METRIKA_ID}','ym');
            ym(${METRIKA_ID},'init',{ssr:true,webvisor:true,clickmap:true,ecommerce:"dataLayer",accurateTrackBounce:true,trackLinks:true});
          `,
        }}
      />
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
