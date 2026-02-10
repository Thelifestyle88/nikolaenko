'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiArrowDown, FiDownload } from 'react-icons/fi';
import { Button } from '@/components/ui/Button';
import { Typewriter } from '@/components/ui/Typewriter';
import styles from './Hero.module.css';

export function Hero() {
  const t = useTranslations('hero');
  const [greetingDone, setGreetingDone] = useState(false);
  const [nameDone, setNameDone] = useState(false);
  const [roleDone, setRoleDone] = useState(false);
  const [descDone, setDescDone] = useState(false);

  const onGreetingComplete = useCallback(() => setGreetingDone(true), []);
  const onNameComplete = useCallback(() => setNameDone(true), []);
  const onRoleComplete = useCallback(() => setRoleDone(true), []);
  const onDescComplete = useCallback(() => setDescDone(true), []);

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Typewriter
            text={t('greeting')}
            delay={400}
            speed={60}
            className={styles.greeting}
            as="p"
            onComplete={onGreetingComplete}
          />

          <Typewriter
            text={t('name')}
            delay={greetingDone ? 0 : 99999}
            speed={70}
            className={styles.name}
            as="h1"
            onComplete={onNameComplete}
          />

          <Typewriter
            text={t('role')}
            delay={nameDone ? 0 : 99999}
            speed={40}
            className={styles.role}
            as="h2"
            onComplete={onRoleComplete}
          />

          <Typewriter
            text={t('description')}
            delay={roleDone ? 0 : 99999}
            duration={5000}
            humanize
            className={styles.description}
            as="p"
            showCursor
            onComplete={onDescComplete}
          />

          <motion.div
            className={styles.buttons}
            initial={{ opacity: 0 }}
            animate={descDone ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button href="#projects">
              {t('viewProjects')}
              <FiArrowDown />
            </Button>
            <Button variant="outline" href="/resume-ru.pdf" download>
              {t('downloadResume')}
              <FiDownload />
            </Button>
          </motion.div>
        </div>

        <div className={styles.photoWrapper}>
          <div className={styles.photoBorder}>
            <div className={styles.photoInner}>
              <Image
                src="/images/avater.jpg"
                alt={t('name')}
                width={340}
                height={340}
                className={styles.photo}
                priority
                fetchPriority="high"
              />
            </div>
          </div>
          <div className={styles.photoGlow} />
        </div>
      </div>

      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={descDone ? { opacity: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <FiArrowDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
