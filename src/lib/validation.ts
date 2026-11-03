import { copy } from '../content/content';
import { PRODUCT_OPTIONS, type EnquiryPayload, type EnquirySource, type ProductOption } from '../types';

export interface EnquiryFormValues {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  product: string;
  volume: string;
  destinationCountry: string;
  message: string;
}

export type EnquiryField = keyof EnquiryFormValues;
export type FormErrors = Partial<Record<EnquiryField, string>>;

export const emptyEnquiry: EnquiryFormValues = {
  fullName: '',
  email: '',
  phone: '',
  company: '',
  product: '',
  volume: '',
  destinationCountry: '',
  message: '',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+0-9\s()-]{6,}$/;

export function validateEnquiry(values: EnquiryFormValues): FormErrors {
  const errors: FormErrors = {};
  const msg = copy.form.errors;

  if (values.fullName.trim().length < 2) errors.fullName = msg.fullName;

  const email = values.email.trim();
  if (!email) errors.email = msg.emailRequired;
  else if (!EMAIL_RE.test(email)) errors.email = msg.emailInvalid;

  const phone = values.phone.trim();
  if (phone && !PHONE_RE.test(phone)) errors.phone = msg.phone;

  const volume = values.volume.trim();
  if (volume && !(Number.isFinite(Number(volume)) && Number(volume) >= 0)) errors.volume = msg.volume;

  return errors;
}

function optional(value: string): string | undefined {
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

function isProduct(value: string): value is ProductOption {
  return (PRODUCT_OPTIONS as readonly string[]).includes(value);
}

export function toPayload(source: EnquirySource, values: EnquiryFormValues): EnquiryPayload {
  const volume = optional(values.volume);
  return {
    source,
    fullName: values.fullName.trim(),
    email: values.email.trim(),
    phone: optional(values.phone),
    company: optional(values.company),
    product: isProduct(values.product) ? values.product : undefined,
    volumeTonnes: volume === undefined ? undefined : Number(volume),
    destinationCountry: optional(values.destinationCountry),
    message: optional(values.message),
  };
}
