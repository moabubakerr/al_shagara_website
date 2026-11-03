import { useEffect, useRef, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import { copy } from '../content/content';
import { useEnquiryForm } from '../hooks/useEnquiryForm';
import { PRODUCT_OPTIONS } from '../types';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Textarea } from './ui/Textarea';
import styles from './QuoteModal.module.css';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface QuoteModalProps {
  open: boolean;
  onClose: () => void;
}

export function QuoteModal({ open, onClose }: QuoteModalProps) {
  // Unmounting the dialog when closed resets form state on every reopen.
  return open ? createPortal(<QuoteDialog onClose={onClose} />, document.body) : null;
}

function QuoteDialog({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const { field, handleSubmit, status, formRef } = useEnquiryForm('quote-modal');
  const { form, quote } = copy;

  useEffect(() => {
    const trigger = document.activeElement as HTMLElement | null;
    const { body, documentElement } = document;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    dialogRef.current?.querySelector<HTMLElement>('input, select, textarea')?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusables = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!first || !last) return;

      const activeInside = dialogRef.current.contains(document.activeElement);
      if (event.shiftKey && (document.activeElement === first || !activeInside)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !activeInside)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
      trigger?.focus();
    };
  }, [onClose]);

  const onOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <div className={styles.overlay} onClick={onOverlayClick}>
      <div ref={dialogRef} className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="quote-title">
        <div className={styles.header}>
          <div>
            <h2 id="quote-title" className={styles.title}>
              {quote.title}
            </h2>
            <p className={styles.subtitle}>{quote.body}</p>
          </div>
          <button type="button" className={styles.close} aria-label={quote.close} onClick={onClose}>
            ×
          </button>
        </div>

        {status === 'success' ? (
          <div className={styles.successWrap}>
            <p className={styles.success} role="status">
              {quote.success}
            </p>
            <Button variant="outline" onClick={onClose} autoFocus>
              {quote.close}
            </Button>
          </div>
        ) : (
          <form ref={formRef} className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.row}>
              <Input
                {...field('fullName')}
                label={form.fullName.label}
                placeholder={form.fullName.placeholder}
                autoComplete="name"
                required
              />
              <Input
                {...field('company')}
                label={form.company.label}
                placeholder={form.company.placeholder}
                autoComplete="organization"
              />
            </div>
            <div className={styles.row}>
              <Input
                {...field('email')}
                type="email"
                label={form.email.label}
                placeholder={form.email.placeholder}
                autoComplete="email"
                required
              />
              <Input
                {...field('phone')}
                type="tel"
                label={form.phone.label}
                placeholder={form.phone.placeholder}
                autoComplete="tel"
              />
            </div>
            <div className={styles.row}>
              <Select
                {...field('product')}
                label={form.product.label}
                placeholder={form.product.placeholder}
                options={PRODUCT_OPTIONS}
              />
              <Input
                {...field('volume')}
                type="number"
                inputMode="decimal"
                min={0}
                step="any"
                label={form.volume.label}
                placeholder={form.volume.placeholder}
              />
            </div>
            <Input
              {...field('destinationCountry')}
              label={form.destination.label}
              placeholder={form.destination.placeholder}
              autoComplete="country-name"
            />
            <Textarea
              {...field('message')}
              rows={3}
              label={form.quoteMessage.label}
              placeholder={form.quoteMessage.placeholder}
            />
            {status === 'error' && (
              <p className={styles.error} role="alert">
                {form.error}
              </p>
            )}
            <Button type="submit" variant="primary" size="lg" block loading={status === 'submitting'}>
              {status === 'submitting' ? form.submitting : quote.submit}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
