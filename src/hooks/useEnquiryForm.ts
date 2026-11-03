import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { submitEnquiry } from '../api/enquiry';
import {
  emptyEnquiry,
  toPayload,
  validateEnquiry,
  type EnquiryField,
  type EnquiryFormValues,
  type FormErrors,
} from '../lib/validation';
import type { EnquirySource, FormStatus } from '../types';

type FieldElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export function useEnquiryForm(source: EnquirySource) {
  const [values, setValues] = useState<EnquiryFormValues>(emptyEnquiry);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const field = (name: EnquiryField) => ({
    name,
    value: values[name],
    error: errors[name],
    onChange: (event: ChangeEvent<FieldElement>) => {
      const { value } = event.target;
      setValues((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    },
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'submitting') return;

    const nextErrors = validateEnquiry(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      requestAnimationFrame(() =>
        formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
      );
      return;
    }

    setStatus('submitting');
    try {
      await submitEnquiry(toPayload(source, values));
      setStatus('success');
      setValues(emptyEnquiry);
    } catch {
      setStatus('error');
    }
  };

  return { field, handleSubmit, status, formRef };
}
