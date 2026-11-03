import { useId, type ReactNode } from 'react';
import styles from './Field.module.css';

interface FieldProps {
  label: string;
  required?: boolean;
  error?: string;
  id?: string;
  className?: string;
  children: (control: { id: string; className: string; 'aria-invalid'?: true; 'aria-describedby'?: string }) => ReactNode;
}

/** Label + control + error message wrapper shared by Input, Select and Textarea. */
export function Field({ label, required, error, id, className, children }: FieldProps) {
  const autoId = useId();
  const controlId = id ?? autoId;
  const errorId = `${controlId}-error`;

  return (
    <div className={[styles.field, className].filter(Boolean).join(' ')}>
      <label htmlFor={controlId} className={styles.label}>
        {label}
        {required && (
          <span className={styles.required} aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children({
        id: controlId,
        className: [styles.control, error && styles.invalid].filter(Boolean).join(' '),
        'aria-invalid': error ? true : undefined,
        'aria-describedby': error ? errorId : undefined,
      })}
      {error && (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}

export { styles as fieldStyles };
