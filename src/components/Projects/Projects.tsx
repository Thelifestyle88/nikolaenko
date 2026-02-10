'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';
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

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const openLightbox = (images: string[], index: number) => {
    setLightbox({ images, index });
  };

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const goNext = useCallback(() => {
    setLightbox((prev) => {
      if (!prev) return null;
      return { ...prev, index: (prev.index + 1) % prev.images.length };
    });
  }, []);

  const goPrev = useCallback(() => {
    setLightbox((prev) => {
      if (!prev) return null;
      return { ...prev, index: (prev.index - 1 + prev.images.length) % prev.images.length };
    });
  }, []);

  /* Блокировка скролла при открытом лайтбоксе (зависит только от open/close, не от index) */
  const isLightboxOpen = lightbox !== null;
  const scrollYRef = useRef(0);

  useEffect(() => {
    if (!isLightboxOpen) return;

    scrollYRef.current = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      window.scrollTo(0, scrollYRef.current);
    };
  }, [isLightboxOpen]);

  /* Клавиатурная навигация */
  useEffect(() => {
    if (!lightbox) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightbox, closeLightbox, goNext, goPrev]);

  /* Обработка тач-свайпов */
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    /* Свайп горизонтальный и достаточно длинный */
    if (absDx > 40 && absDx > absDy * 1.2) {
      if (dx < 0) goNext();
      else goPrev();
    }

    /* Свайп вниз — закрыть */
    if (absDy > 80 && absDy > absDx * 1.5 && dy > 0) {
      closeLightbox();
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <Section id="projects">
      <SectionTitle title={t('title')} subtitle={t('subtitle')} />

      <div className={styles.grid}>
        {projects.map((project, index) => (
          <div
            key={project.key}
            className={styles.card}
            style={{ '--i': index } as React.CSSProperties}
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
          </div>
        ))}
      </div>

      {/* Lightbox — через portal в body, чтобы position:fixed работал от viewport */}
      {lightbox && createPortal(
        <div
          className={styles.lightbox}
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
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

          <div
            className={styles.lightboxContent}
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
            <p className={styles.lightboxSwipeHint}>
              ← swipe →
            </p>
          </div>

          <button
            className={`${styles.lightboxArrow} ${styles.lightboxArrowRight}`}
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            aria-label="Next"
          >
            <FiChevronRight size={32} />
          </button>
        </div>,
        document.body
      )}
    </Section>
  );
}
