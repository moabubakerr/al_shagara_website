import type { EnquiryPayload } from '../types';

const ENDPOINT = import.meta.env.VITE_ENQUIRY_ENDPOINT as string | undefined;

/**
 * Sends an enquiry to the configured endpoint (Formspree, a serverless function, etc.).
 * Without VITE_ENQUIRY_ENDPOINT it simulates success so the UI can be developed offline.
 */
export async function submitEnquiry(payload: EnquiryPayload): Promise<void> {
  if (!ENDPOINT) {
    await new Promise((resolve) => setTimeout(resolve, 700));
    return;
  }

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Enquiry failed with status ${response.status}`);
  }
}
