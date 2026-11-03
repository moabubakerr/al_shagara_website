import { brand, copy } from '../content/content';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        © {new Date().getFullYear()} {brand.name} ·{' '}
        <span dir="rtl" lang="ar">
          {brand.ar}
        </span>
      </p>
      <p>{copy.footer.origin}</p>
    </footer>
  );
}
