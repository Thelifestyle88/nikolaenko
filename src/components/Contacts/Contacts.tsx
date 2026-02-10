'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
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

  return (
    <Section id="contacts">
      <SectionTitle title={t('title')} subtitle={t('subtitle')} />

      <div className={styles.grid}>
        {contactLinks.map((contact, index) => (
          <motion.a
            key={contact.key}
            href={contact.href}
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ y: -4 }}
          >
            <contact.icon className={styles.icon} size={28} />
            <span className={styles.label}>{t(contact.key)}</span>
            <span className={styles.value}>{contact.value}</span>
          </motion.a>
        ))}
      </div>

      <motion.div
        className={styles.resumeSection}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Button href="/resume-ru.pdf" download>
          <FiDownload />
          {t('downloadResume')}
        </Button>
      </motion.div>
    </Section>
  );
}
