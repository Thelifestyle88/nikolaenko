'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
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
          <motion.div
            key={index}
            className={styles.timelineItem}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
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
                    <motion.li
                      key={i}
                      className={styles.achievementItem}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + i * 0.08, duration: 0.4 }}
                    >
                      <FiCheckCircle className={styles.checkIcon} size={18} />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
