import { useEffect, useState } from 'react';
import { brand, copy, navLinks } from '../content/content';
import styles from './Header.module.css';

interface HeaderProps {
  onOpenQuote: () => void;
}

export function Header({ onOpenQuote }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    const desktop = window.matchMedia('(min-width: 900px)');
    const onResize = () => desktop.matches && setMenuOpen(false);
    document.addEventListener('keydown', onKeyDown);
    desktop.addEventListener('change', onResize);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      desktop.removeEventListener('change', onResize);
    };
  }, [menuOpen]);

  return (
    <header className={styles.header}>
      <a href="#main" className="skip-link">
        {copy.header.skip}
      </a>
      <div className={styles.inner}>
        <a href="#top" className={styles.brand}>
          <img src={brand.logo} alt="" width={34} height={42} className={styles.logo} />
          <span>{brand.wordmark}</span>
        </a>

        <nav id="primary-nav" aria-label="Primary" className={styles.nav} data-open={menuOpen}>
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={styles.navLink} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <button type="button" className={styles.quote} onClick={onOpenQuote}>
            {copy.header.quote}
          </button>
          <button
            type="button"
            className={styles.menuToggle}
            aria-expanded={menuOpen}
            aria-controls="primary-nav"
            aria-label={menuOpen ? copy.header.closeMenu : copy.header.openMenu}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className={styles.burger} data-open={menuOpen} aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
