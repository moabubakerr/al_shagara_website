import { copy } from '../content/content';
import { Container } from './ui/Container';
import { Eyebrow } from './ui/Eyebrow';
import styles from './People.module.css';

export function People() {
  const { people } = copy;
  return (
    <section
      id="people"
      className={styles.section}
      aria-labelledby="people-title"
      style={{ ['--people-image' as string]: `url(${people.image})` }}
    >
      <Container>
        <Eyebrow tone="dark">{people.eyebrow}</Eyebrow>
        <h2 id="people-title" className={styles.title}>
          {people.title}
        </h2>
        <p className={styles.body}>{people.body}</p>
      </Container>
    </section>
  );
}
