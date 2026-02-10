'use client';

import { useTranslations } from 'next-intl';
import { FiBriefcase, FiCheckCircle } from 'react-icons/fi';
import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import styles from './Experience.module.css';

type Job = {
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
};

export function Experience() {
  const t = useTranslations('experience');

  const jobs = t.raw('jobs') as Job[];

  return (
    <Section id="experience" alternate>
      <SectionTitle title={t('title')} />

      <div className={styles.timeline}>
        {jobs.map((job, index) => (
          <div
            key={index}
            className={styles.timelineItem}
            style={{ '--i': index } as React.CSSProperties}
          >
            <div className={styles.timelineDot}>
              <FiBriefcase size={20} />
            </div>

            <div className={styles.timelineContent}>
              <div className={styles.timelineHeader}>
                <div>
                  <h3 className={styles.company}>{job.company}</h3>
                  <p className={styles.role}>{job.role}</p>
                </div>
                <span className={styles.period}>{job.period}</span>
              </div>

              <p className={styles.companyDescription}>{job.description}</p>

              <div className={styles.achievementsBlock}>
                <ul className={styles.achievementsList}>
                  {job.achievements.map((item, i) => (
                    <li key={i} className={styles.achievementItem}>
                      <FiCheckCircle className={styles.checkIcon} size={18} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
