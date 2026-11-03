import type { SelectHTMLAttributes } from 'react';
import { Field, fieldStyles } from './Field';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  placeholder?: string;
  options: readonly string[];
}

export function Select({ label, error, required, id, className, placeholder, options, value, ...rest }: SelectProps) {
  return (
    <Field label={label} required={required} error={error} id={id} className={className}>
      {(control) => (
        <select
          {...control}
          className={[control.className, !value && fieldStyles.placeholder].filter(Boolean).join(' ')}
          required={required}
          value={value}
          {...rest}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    </Field>
  );
}
