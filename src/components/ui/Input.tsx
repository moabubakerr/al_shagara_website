import type { InputHTMLAttributes } from 'react';
import { Field } from './Field';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, required, id, className, ...rest }: InputProps) {
  return (
    <Field label={label} required={required} error={error} id={id} className={className}>
      {(control) => <input {...control} required={required} {...rest} />}
    </Field>
  );
}
