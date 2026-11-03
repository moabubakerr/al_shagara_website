import { copy, foods } from '../content/content';
import { ComingSoonBanner } from './ComingSoonBanner';
import { ProductPouch } from './ProductPouch';
import { Container } from './ui/Container';
import { Eyebrow } from './ui/Eyebrow';
import styles from './DriedFoods.module.css';

export function DriedFoods() {
  return (
    <section id="foods" className={styles.section} aria-labelledby="foods-title">
      <Container className={styles.stack}>
        <div>
          <Eyebrow>{copy.foods.eyebrow}</Eyebrow>
          <h2 id="foods-title" className={styles.title}>
            {copy.foods.title}
          </h2>
        </div>

        <ul className={styles.grid}>
          {foods.map((product) => (
            <li key={product.title} className={styles.card}>
              <div className={styles.visual}>
                <ProductPouch product={product} />
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardHead}>
                  <h3 className={styles.cardTitle}>{product.title}</h3>
                  <span className={styles.weight}>{product.weight}</span>
                </div>
                <p className={styles.cardText}>{product.body}</p>
              </div>
            </li>
          ))}
        </ul>

        <ComingSoonBanner />

        <ul className={styles.benefits}>
          {copy.foods.benefits.map((b) => (
            <li key={b.title} className={styles.benefit}>
              <h3 className={styles.benefitTitle}>{b.title}</h3>
              <p className={styles.benefitText}>{b.desc}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
