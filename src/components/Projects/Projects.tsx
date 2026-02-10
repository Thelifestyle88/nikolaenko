'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FiUsers, FiZap, FiCode, FiImage, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import styles from './Projects.module.css';

type ProjectData = {
  key: string;
  teamSize?: number;
  fromScratch: boolean;
  hasAchievement: boolean;
  techStack: string[];
  screenshots?: string[];
};

const projects: ProjectData[] = [
  {
    key: 'project1',
    teamSize: 8,
    fromScratch: true,
    hasAchievement: false,
    techStack: [
      'React',
      'TypeScript',
      'Redux Toolkit',
      'CSS Modules',
      'REST API',
      'WebSocket (StompJS)',
      'React-Hook-Form',
    ],
  },
  {
    key: 'project2',
    teamSize: 11,
    fromScratch: true,
    hasAchievement: false,
    techStack: [
      'React',
      'TypeScript',
      'Redux Toolkit',
      'CSS Modules',
      'WebSocket (Socket.io)',
      'React-Hook-Form',
    ],
  },
  {
    key: 'project3',
    teamSize: 12,
    fromScratch: false,
    hasAchievement: true,
    techStack: [
      'React',
      'TypeScript',
      'Redux Toolkit',
      'SCSS Modules',
      'Ant Design',
      'Canvas API',
      'WebSocket (StompJS)',
    ],
    screenshots: [
      '/images/PUSK/ASUDD/asudd1.jpg',
      '/images/PUSK/ASUDD/asudd2.jpg',
      '/images/PUSK/ASUDD/asudd3.jpg',
    ],
  },
  {
    key: 'project4',
    fromScratch: true,
    hasAchievement: false,
    techStack: [
      'Next.js',
      'React',
      'TypeScript',
      'Redux Toolkit',
      'REST API',
      'React-Hook-Form',
      'Markdown',
    ],
    screenshots: [
      '/images/bugbounty/bb1.jpg',
      '/images/bugbounty/bb2.jpg',
      '/images/bugbounty/bb3.jpg',
    ],
  },
];

export function Projects() {
  const t = useTranslations('projects');
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);

  const openLightbox = (images: string[], index: number) => {
    setLightbox({ images, index });
  };

  const closeLightbox = () => setLightbox(null);

  const goNext = () => {
    if (!lightbox) return;
    setLightbox({
      ...lightbox,
      index: (lightbox.index + 1) % lightbox.images.length,
    });
  };

  const goPrev = () => {
    if (!lightbox) return;
    setLightbox({
      ...lightbox,
      index: (lightbox.index - 1 + lightbox.images.length) % lightbox.images.length,
    });
  };

  return (
    <Section id="projects">
      <SectionTitle title={t('title')} subtitle={t('subtitle')} />

      <div className={styles.grid}>
        {projects.map((project, index) => (
          <motion.div
            key={project.key}
            className={styles.card}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
          >
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>
                {t(`${project.key}.title`)}
              </h3>
              <div className={styles.cardSubheader}>
                <span className={styles.companyBadge}>
                  {t(`${project.key}.company`)}
                </span>
                <p className={styles.location}>{t(`${project.key}.location`)}</p>
              </div>
            </div>

            <p className={styles.cardDescription}>
              {t(`${project.key}.description`)}
            </p>

            {project.screenshots && project.screenshots.length > 0 && (
              <div className={styles.screenshotsSection}>
                <p className={styles.screenshotsLabel}>
                  <FiImage size={14} />
                  {t('screenshots')}
                </p>
                <div className={styles.screenshotsGrid}>
                  {project.screenshots.map((src, i) => (
                    <button
                      key={src}
                      className={styles.screenshotThumb}
                      onClick={() => openLightbox(project.screenshots!, i)}
                      aria-label={`Screenshot ${i + 1}`}
                    >
                      <Image
                        src={src}
                        alt={`${t(`${project.key}.title`)} screenshot ${i + 1}`}
                        width={200}
                        height={120}
                        className={styles.screenshotImg}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.highlights}>
              <FiCode className={styles.highlightIcon} />
              <p className={styles.highlightText}>
                {t(`${project.key}.highlights`)}
              </p>
            </div>

            <div className={styles.techStack}>
              {project.techStack.map((tech) => (
                <span key={tech} className={styles.techBadge}>
                  {tech}
                </span>
              ))}
            </div>

            <div className={styles.meta}>
              {project.teamSize && (
                <div className={styles.metaItem}>
                  <FiUsers size={16} />
                  <span>{t('team', { count: project.teamSize })}</span>
                </div>
              )}
              {project.fromScratch && (
                <div className={`${styles.metaItem} ${styles.metaAccent}`}>
                  <FiCode size={16} />
                  <span>{t('builtFromScratch')}</span>
                </div>
              )}
              {project.hasAchievement && (
                <div className={`${styles.metaItem} ${styles.metaAccent}`}>
                  <FiZap size={16} />
                  <span>{t(`${project.key}.achievement`)}</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button className={styles.lightboxClose} onClick={closeLightbox} aria-label="Close">
              <FiX size={28} />
            </button>

            <button
              className={`${styles.lightboxArrow} ${styles.lightboxArrowLeft}`}
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              aria-label="Previous"
            >
              <FiChevronLeft size={32} />
            </button>

            <motion.div
              key={lightbox.index}
              className={styles.lightboxContent}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightbox.images[lightbox.index]}
                alt={`Screenshot ${lightbox.index + 1}`}
                width={1200}
                height={800}
                className={styles.lightboxImg}
              />
              <p className={styles.lightboxCounter}>
                {lightbox.index + 1} / {lightbox.images.length}
              </p>
            </motion.div>

            <button
              className={`${styles.lightboxArrow} ${styles.lightboxArrowRight}`}
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              aria-label="Next"
            >
              <FiChevronRight size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
