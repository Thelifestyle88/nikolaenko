'use client';

import { useTranslations, useLocale } from 'next-intl';
import { FiMail, FiSend, FiGithub, FiLinkedin, FiDownload } from 'react-icons/fi';
import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import styles from './Contacts.module.css';

const contactLinks = [
  {
    key: 'email',
    icon: FiMail,
    href: 'mailto:nikonikolaenko88@gmail.com',
    value: 'nikonikolaenko88@gmail.com',
  },
  {
    key: 'telegram',
    icon: FiSend,
    href: 'https://t.me/Thelifestyle88',
    value: '@Thelifestyle88',
  },
  {
    key: 'github',
    icon: FiGithub,
    href: 'https://github.com/Thelifestyle88',
    value: 'github.com/Thelifestyle88',
  },
  {
    key: 'linkedin',
    icon: FiLinkedin,
    href: 'https://ru.linkedin.com/in/nick-nikolaenko-aa4b5083',
    value: 'linkedin.com/in/nick-nikolaenko-aa4b5083',
  },
];

export function Contacts() {
  const t = useTranslations('contacts');
  const locale = useLocale();
  const resumeFile = locale === 'en' ? '/resume-en.pdf' : '/resume-ru.pdf';

  return (
    <Section id="contacts">
      <SectionTitle title={t('title')} subtitle={t('subtitle')} />

      <div className={styles.grid}>
        {contactLinks.map((contact, index) => (
          <a
            key={contact.key}
            href={contact.href}
            className={styles.card}
            style={{ '--i': index } as React.CSSProperties}
            target="_blank"
            rel="noopener noreferrer"
          >
            <contact.icon className={styles.icon} size={28} />
            <span className={styles.label}>{t(contact.key)}</span>
            <span className={styles.value}>{contact.value}</span>
          </a>
        ))}
      </div>

      <div className={styles.resumeSection}>
        <Button href={resumeFile} download>
          <FiDownload />
          {t('downloadResume')}
        </Button>
      </div>
    </Section>
  );
}
