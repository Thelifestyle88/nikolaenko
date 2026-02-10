'use client';

import { useTranslations } from 'next-intl';
import {
  SiReact,
  SiTypescript,
  SiRedux,
  SiNextdotjs,
  SiCssmodules,
  SiSass,
  SiGit,
} from 'react-icons/si';
import { TbApi, TbBrandSocketIo, TbForms } from 'react-icons/tb';
import { BiCodeBlock } from 'react-icons/bi';
import {
  FiCode,
  FiLayout,
  FiUsers,
  FiZap,
  FiPackage,
  FiMic,
} from 'react-icons/fi';
import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import styles from './About.module.css';

const techStack = [
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'Redux Toolkit', icon: SiRedux, color: '#764ABC' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#currentColor' },
  { name: 'WebSocket', icon: TbBrandSocketIo, color: '#25c2a0' },
  { name: 'REST API', icon: TbApi, color: '#FF6C37' },
  { name: 'CSS Modules', icon: SiCssmodules, color: '#1572B6' },
  { name: 'SCSS', icon: SiSass, color: '#CC6699' },
  { name: 'Canvas API', icon: BiCodeBlock, color: '#E34F26' },
  { name: 'React-Hook-Form', icon: TbForms, color: '#EC5990' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
];

export function About() {
  const t = useTranslations('about');

  const softSkills = [
    { key: 'codeReview', icon: FiCode },
    { key: 'architecture', icon: FiLayout },
    { key: 'meetups', icon: FiMic },
    { key: 'mentoring', icon: FiUsers },
    { key: 'optimization', icon: FiZap },
    { key: 'fromScratch', icon: FiPackage },
  ];

  return (
    <Section id="about" alternate>
      <SectionTitle title={t('title')} />

      <p className={styles.description}>{t('description')}</p>

      <h3 className={styles.subtitle}>{t('techStack')}</h3>
      <div className={styles.techGrid}>
        {techStack.map((tech) => (
          <div key={tech.name} className={styles.techCard}>
            <tech.icon
              className={styles.techIcon}
              size={32}
              style={{
                color: tech.color === '#currentColor' ? undefined : tech.color,
              }}
            />
            <span className={styles.techName}>{tech.name}</span>
          </div>
        ))}
      </div>

      <h3 className={styles.subtitle}>{t('softSkills')}</h3>
      <div className={styles.skillsGrid}>
        {softSkills.map((skill) => (
          <div key={skill.key} className={styles.skillCard}>
            <skill.icon className={styles.skillIcon} size={24} />
            <span>{t(skill.key)}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}
