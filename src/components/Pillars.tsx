import { copy, pillars } from '../content/content';
import { Container } from './ui/Container';
import { Eyebrow } from './ui/Eyebrow';
import styles from './Pillars.module.css';

export function Pillars() {
  return (
    <section id="pillars" className={styles.section} aria-labelledby="pillars-title">
      <Container className={styles.grid}>
        <div className={styles.intro}>
          <Eyebrow>{copy.pillars.eyebrow}</Eyebrow>
          <h2 id="pillars-title" className={styles.title}>
            {copy.pillars.title}
          </h2>
          <p className={styles.body}>{copy.pillars.body}</p>
        </div>

        <ol className={styles.list}>
          {pillars.map((p) => (
            <li key={p.n} className={styles.row}>
              <span className={styles.number}>{p.n}</span>
              <div>
                <h3 className={styles.rowTitle}>{p.title}</h3>
                <p className={styles.rowBody}>{p.body}</p>
              </div>
              <span className={styles.ar} dir="rtl" lang="ar">
                {p.ar}
              </span>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
