import { useEffect, useRef, useState, type FocusEvent, type KeyboardEvent } from 'react';
import { copy, valueChainSteps } from '../content/content';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { Container } from './ui/Container';
import { Eyebrow } from './ui/Eyebrow';
import styles from './ValueChain.module.css';

const STEP_MS = 2000;

export function ValueChain() {
  const total = valueChainSteps.length;
  const [active, setActive] = useState(0);
  // `tick` bumps on every manual selection so the timer restarts even when re-selecting the same step.
  const [tick, setTick] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const paused = hovered || keyboardFocus || reducedMotion;

  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => setActive((s) => (s + 1) % total), STEP_MS);
    return () => window.clearTimeout(id);
  }, [active, tick, paused, total]);

  const select = (index: number) => {
    setActive(((index % total) + total) % total);
    setTick((t) => t + 1);
  };

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number | null = null;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % total;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + total) % total;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = total - 1;
    if (next === null) return;
    event.preventDefault();
    select(next);
    tabRefs.current[next]?.focus();
  };

  // Pause only for keyboard focus; a mouse click leaves focus on the button and should not freeze the timer.
  const onFocus = (event: FocusEvent<HTMLDivElement>) => {
    if (event.target.matches(':focus-visible')) setKeyboardFocus(true);
  };
  const onBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setKeyboardFocus(false);
  };

  const step = valueChainSteps[active]!;

  return (
    <section id="chain" className={styles.band} aria-labelledby="chain-title">
      <Container>
        <div className={styles.head}>
          <h2 id="chain-title" className={styles.title}>
            {copy.chain.title}
          </h2>
          <p className={styles.helper}>{copy.chain.helper}</p>
        </div>

        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={onFocus}
          onBlur={onBlur}
        >
          <div role="tablist" aria-label={copy.chain.tablist} className={styles.tabs}>
            {valueChainSteps.map((s, i) => {
              const selected = i === active;
              return (
                <button
                  key={s.title}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`chain-tab-${i}`}
                  aria-selected={selected}
                  aria-controls="chain-panel"
                  tabIndex={selected ? 0 : -1}
                  className={styles.tab}
                  data-active={selected}
                  onClick={() => select(i)}
                  onKeyDown={(e) => onTabKeyDown(e, i)}
                >
                  <span className={styles.tabNumber}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={styles.tabTitle}>{s.title}</span>
                </button>
              );
            })}
          </div>

          <div id="chain-panel" role="tabpanel" aria-labelledby={`chain-tab-${active}`} className={styles.panel}>
            <div className={styles.media}>
              {valueChainSteps.map((s, i) => (
                <img
                  key={s.image}
                  src={s.image}
                  alt={i === active ? s.title : ''}
                  aria-hidden={i !== active}
                  width={880}
                  height={605}
                  loading="lazy"
                  className={styles.image}
                  data-active={i === active}
                />
              ))}
            </div>

            <div className={styles.copy}>
              <Eyebrow tone="dark">{copy.chain.stage(active + 1, total)}</Eyebrow>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepBody}>{step.body}</p>
              <div className={styles.controls}>
                <button
                  type="button"
                  className={styles.prev}
                  aria-label={copy.chain.prev}
                  onClick={() => select(active - 1)}
                >
                  ←
                </button>
                <button
                  type="button"
                  className={styles.next}
                  aria-label={copy.chain.next}
                  onClick={() => select(active + 1)}
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
