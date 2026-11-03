import { brand, copy } from '../content/content';
import type { FoodProduct } from '../types';
import styles from './ProductPouch.module.css';

/** CSS-drawn kraft pouch. Renders the real pack photo instead when `product.image` is set. */
export function ProductPouch({ product }: { product: FoodProduct }) {
  if (product.image) {
    return <img src={product.image} alt={product.title} loading="lazy" className={styles.photo} />;
  }

  return (
    <div className={styles.pouch} aria-hidden="true">
      <div className={styles.seal} />
      <div className={styles.contents}>
        <img src={brand.logo} alt="" width={20} height={24} className={styles.logo} />
        <span className={styles.label}>{copy.foods.pouchLabel}</span>
        <span className={styles.window} style={{ background: product.swatch }} />
        <span className={styles.name}>{product.short}</span>
        <span className={styles.ar} dir="rtl" lang="ar">
          {product.ar}
        </span>
        <span className={styles.weight}>{product.weight}</span>
      </div>
    </div>
  );
}
