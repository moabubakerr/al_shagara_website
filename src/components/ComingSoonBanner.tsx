import { copy } from '../content/content';
import styles from './ComingSoonBanner.module.css';

export function ComingSoonBanner() {
  const { comingSoon } = copy.foods;
  return (
    <aside className={styles.banner} aria-labelledby="coming-soon-title">
      <div>
        <span className={styles.pill}>{comingSoon.pill}</span>
        <h3 id="coming-soon-title" className={styles.title}>
          {comingSoon.title}
        </h3>
        <p className={styles.ar} dir="rtl" lang="ar">
          {comingSoon.ar}
        </p>
      </div>
      <p className={styles.body}>{comingSoon.body}</p>
    </aside>
  );
}
