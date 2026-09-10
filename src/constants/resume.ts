export const RESUME_FILES = {
  en: '/Nick_Nikolaenko_Frontend_Developer_CV_main.docx',
  ru: '/resume_ru.pdf',
} as const;

export function getResumePath(locale: string) {
  return locale === 'en' ? RESUME_FILES.en : RESUME_FILES.ru;
}
