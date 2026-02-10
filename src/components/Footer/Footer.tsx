'use client';

import { useTranslations } from 'next-intl';
import { FiGithub, FiSend, FiLinkedin } from 'react-icons/fi';
import styles from './Footer.module.css';

export function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.socials}>
          <a
            href="https://github.com/Thelifestyle88"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="GitHub"
          >
            <FiGithub size={20} />
          </a>
          <a
            href="https://t.me/Thelifestyle88"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="Telegram"
          >
            <FiSend size={20} />
          </a>
          <a
            href="https://ru.linkedin.com/in/nick-nikolaenko-aa4b5083"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="LinkedIn"
          >
            <FiLinkedin size={20} />
          </a>
        </div>

        <p className={styles.builtWith}>{t('builtWith')}</p>
        <p className={styles.copyright}>{t('copyright', { year })}</p>
      </div>
    </footer>
  );
}
