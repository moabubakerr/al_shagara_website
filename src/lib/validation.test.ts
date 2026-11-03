import { describe, expect, it } from 'vitest';
import { emptyEnquiry, toPayload, validateEnquiry } from './validation';

const valid = { ...emptyEnquiry, fullName: 'Amina Osman', email: 'amina@example.com' };

describe('validateEnquiry', () => {
  it('accepts the minimum required fields', () => {
    expect(validateEnquiry(valid)).toEqual({});
  });

  it('requires a name of at least two characters', () => {
    expect(validateEnquiry({ ...valid, fullName: ' A ' }).fullName).toBeDefined();
  });

  it('requires a valid email', () => {
    expect(validateEnquiry({ ...valid, email: '' }).email).toMatch(/enter your email/);
    expect(validateEnquiry({ ...valid, email: 'not-an-email' }).email).toMatch(/valid email/);
  });

  it('validates optional phone only when present', () => {
    expect(validateEnquiry({ ...valid, phone: '+249 912 345 678' }).phone).toBeUndefined();
    expect(validateEnquiry({ ...valid, phone: 'abc' }).phone).toBeDefined();
  });

  it('requires volume to be a non-negative number when present', () => {
    expect(validateEnquiry({ ...valid, volume: '20' }).volume).toBeUndefined();
    expect(validateEnquiry({ ...valid, volume: '0' }).volume).toBeUndefined();
    expect(validateEnquiry({ ...valid, volume: '-1' }).volume).toBeDefined();
    expect(validateEnquiry({ ...valid, volume: 'lots' }).volume).toBeDefined();
  });
});

describe('toPayload', () => {
  it('trims values, drops empty optionals and parses volume', () => {
    const payload = toPayload('quote-modal', {
      ...valid,
      fullName: '  Amina Osman ',
      company: '  ',
      product: 'Gum Arabic Hashab',
      volume: '12.5',
    });
    expect(payload).toEqual({
      source: 'quote-modal',
      fullName: 'Amina Osman',
      email: 'amina@example.com',
      phone: undefined,
      company: undefined,
      product: 'Gum Arabic Hashab',
      volumeTonnes: 12.5,
      destinationCountry: undefined,
      message: undefined,
    });
  });

  it('ignores unknown product values', () => {
    expect(toPayload('contact', { ...valid, product: 'Gold' }).product).toBeUndefined();
  });
});
