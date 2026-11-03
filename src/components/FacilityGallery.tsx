import { useRef } from 'react';
import { copy, gallery } from '../content/content';
import styles from './FacilityGallery.module.css';

export function FacilityGallery() {
  const scrollerRef = useRef<HTMLUListElement>(null);

  const scrollBy = (direction: 1 | -1) => {
    const scroller = scrollerRef.current;
    const item = scroller?.firstElementChild as HTMLElement | null;
    if (!scroller || !item) return;
    scroller.scrollBy({ left: direction * (item.offsetWidth + 16), behavior: 'smooth' });
  };

  return (
    <section className={styles.section} aria-labelledby="gallery-title">
      <div className={styles.head}>
        <h2 id="gallery-title" className={styles.title}>
          {copy.gallery.title}
        </h2>
        <div className={styles.headRight}>
          <span className={styles.hint} aria-hidden="true">
            {copy.gallery.hint}
          </span>
          <div className={styles.arrows}>
            <button type="button" className={styles.arrow} aria-label={copy.gallery.prev} onClick={() => scrollBy(-1)}>
              ←
            </button>
            <button type="button" className={styles.arrow} aria-label={copy.gallery.next} onClick={() => scrollBy(1)}>
              →
            </button>
          </div>
        </div>
      </div>

      <ul ref={scrollerRef} className={styles.scroller} tabIndex={0} aria-label={copy.gallery.title}>
        {gallery.map((item) => (
          <li key={item.image}>
            <figure className={styles.figure}>
              <img src={item.image} alt={item.caption} width={360} height={450} loading="lazy" className={styles.image} />
              <figcaption className={styles.caption}>{item.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
