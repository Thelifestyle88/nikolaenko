'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import styles from './Section.module.css';

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
  alternate?: boolean;
};

export function Section({ id, children, className, alternate }: SectionProps) {
  return (
    <motion.section
      id={id}
      className={`${styles.section} ${alternate ? styles.alternate : ''} ${className || ''}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className={styles.container}>{children}</div>
    </motion.section>
  );
}
