import { copy } from '../content/content';
import { Button } from './ui/Button';
import styles from './Hero.module.css';

export function Hero() {
  const { hero } = copy;
  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <h1 id="hero-title" className={styles.title}>
        {hero.titleBefore}
        <span className={styles.highlight}>{hero.titleHighlight}</span>
        {hero.titleAfter}
      </h1>

      <div className={styles.grid}>
        <div className={styles.intro}>
          <p className={styles.body}>{hero.body}</p>
          <div className={styles.ctaRow}>
            <Button href="#contact" variant="primary" size="lg">
              {hero.cta}
            </Button>
            <a href="#chain" className={styles.link}>
              {hero.link}
            </a>
          </div>
        </div>

        <img
          src={hero.imageMain.src}
          alt={hero.imageMain.alt}
          width={600}
          height={800}
          className={styles.imageMain}
        />

        <figure className={styles.side}>
          <img src={hero.imageSide.src} alt={hero.imageSide.alt} width={800} height={500} className={styles.imageSide} />
          <figcaption className={styles.caption}>{hero.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
