import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

type Variant = 'primary' | 'accent' | 'outline';
type Size = 'sm' | 'md' | 'lg';

interface CommonProps {
  variant?: Variant;
  size?: Size;
  block?: boolean;
  loading?: boolean;
  className?: string;
  children: ReactNode;
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type LinkProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function Button(props: ButtonProps | LinkProps) {
  const { variant = 'primary', size = 'md', block = false, loading = false, className, children, ...rest } = props;
  const cls = [styles.button, styles[variant], styles[size], block && styles.block, className]
    .filter(Boolean)
    .join(' ');
  const content = (
    <>
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      {children}
    </>
  );

  if (rest.href !== undefined) {
    return (
      <a className={cls} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      type="button"
      className={cls}
      aria-busy={loading || undefined}
      {...buttonProps}
      disabled={buttonProps.disabled || loading}
    >
      {content}
    </button>
  );
}
