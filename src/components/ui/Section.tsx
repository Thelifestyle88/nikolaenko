'use client';

import { ReactNode, useRef, useEffect, useState } from 'react';
import styles from './Section.module.css';

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
  alternate?: boolean;
};

export function Section({ id, children, className, alternate }: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '-60px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      className={`${styles.section} ${alternate ? styles.alternate : ''} ${visible ? styles.visible : ''} ${className || ''}`}
    >
      <div className={styles.container}>{children}</div>
    </section>
  );
}
