import { copy } from '../content/content';
import { Container } from './ui/Container';
import { Eyebrow } from './ui/Eyebrow';
import styles from './GumArabicFeature.module.css';

export function GumArabicFeature() {
  const { product } = copy;
  return (
    <section id="product" className={styles.band} aria-labelledby="product-title">
      <Container className={styles.grid}>
        <div className={styles.images}>
          {product.images.map((img) => (
            <img
              key={img.src}
              src={img.src}
              alt={img.alt}
              width={500}
              height={733}
              loading="lazy"
              className={styles.image}
            />
          ))}
        </div>

        <div className={styles.copy}>
          <Eyebrow>{product.eyebrow}</Eyebrow>
          <h2 id="product-title" className={styles.title}>
            {product.title}
          </h2>
          <p className={styles.body}>{product.body}</p>

          <dl className={styles.specs}>
            {product.specs.map((spec) => (
              <div key={spec.label} className={styles.spec}>
                <dt className={styles.specLabel}>{spec.label}</dt>
                <dd className={styles.specValue}>{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
