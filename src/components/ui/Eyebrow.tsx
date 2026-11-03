import type { ReactNode } from 'react';
import styles from './Eyebrow.module.css';

interface EyebrowProps {
  tone?: 'light' | 'dark';
  className?: string;
  children: ReactNode;
}

/** Small uppercase label above headings. `tone="dark"` is for use on dark backgrounds. */
export function Eyebrow({ tone = 'light', className, children }: EyebrowProps) {
  return (
    <p className={[styles.eyebrow, tone === 'dark' && styles.dark, className].filter(Boolean).join(' ')}>
      {children}
    </p>
  );
}
