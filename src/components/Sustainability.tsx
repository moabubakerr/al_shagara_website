import { Fragment } from 'react';
import { applications, copy, impact, productFeatures, sustainabilityModel } from '../content/content';
import { Container } from './ui/Container';
import { Eyebrow } from './ui/Eyebrow';
import styles from './Sustainability.module.css';

export function Sustainability() {
  const { sustainability: s } = copy;
  return (
    <section id="sustainability" className={styles.band} aria-labelledby="sustainability-title">
      <Container className={styles.stack}>
        <div>
          <Eyebrow tone="dark">{s.eyebrow}</Eyebrow>
          <h2 id="sustainability-title" className={styles.title}>
            {s.title}
          </h2>
          <p className={styles.taglines}>
            {s.taglines.map((t, i) => (
              <Fragment key={t}>
                {i > 0 && (
                  <span className={styles.sep} aria-hidden="true">
                    |
                  </span>
                )}
                <span>{t}</span>
              </Fragment>
            ))}
          </p>
        </div>

        <ol className={styles.model}>
          {sustainabilityModel.map((step) => (
            <li key={step.n}>
              <div className={styles.modelMedia}>
                <img src={step.image} alt="" width={600} height={450} loading="lazy" className={styles.modelImage} />
                <span className={styles.badge} aria-hidden="true">
                  {step.n}
                </span>
              </div>
              <h3 className={styles.modelTitle}>
                <span className="visually-hidden">Step {step.n}: </span>
                {step.title}
              </h3>
              <p className={styles.modelBody}>{step.body}</p>
            </li>
          ))}
        </ol>

        <div>
          <h3 className={styles.label}>{s.featuresLabel}</h3>
          <ul className={styles.features}>
            {productFeatures.map((f) => (
              <li key={f.title} className={styles.feature}>
                <span className={styles.dot} aria-hidden="true" />
                <p className={styles.featureTitle}>{f.title}</p>
                <p className={styles.featureDesc}>{f.desc}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.applications}>
          <div>
            <h3 className={styles.applicationsTitle}>{s.applicationsTitle}</h3>
            <p className={styles.applicationsBody}>{s.applicationsBody}</p>
          </div>
          <dl className={styles.table}>
            {applications.map((a) => (
              <div key={a.use} className={styles.tableRow}>
                <dt className={styles.use}>{a.use}</dt>
                <dd className={styles.items}>{a.items}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h3 className={styles.label}>{s.impactLabel}</h3>
          <ul className={styles.impact}>
            {impact.map((stat) => (
              <li key={stat.label} className={styles.stat}>
                <p className={styles.statValue}>{stat.value}</p>
                <p className={styles.statLabel}>{stat.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
