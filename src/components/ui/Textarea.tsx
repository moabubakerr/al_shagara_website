import type { TextareaHTMLAttributes } from 'react';
import { Field } from './Field';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function Textarea({ label, error, required, id, className, ...rest }: TextareaProps) {
  return (
    <Field label={label} required={required} error={error} id={id} className={className}>
      {(control) => <textarea {...control} required={required} {...rest} />}
    </Field>
  );
}
