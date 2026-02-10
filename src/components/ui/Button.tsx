import { ReactNode } from 'react';
import styles from './Button.module.css';

type ButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'outline';
  href?: string;
  onClick?: () => void;
  download?: boolean;
};

export function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  download,
}: ButtonProps) {
  const className = `${styles.button} ${styles[variant]}`;

  if (href) {
    const isExternal = href.startsWith('http');
    return (
      <a
        href={href}
        className={className}
        download={download}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}
