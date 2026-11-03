export interface Step { title: string; body: string; image: string }
export interface Pillar { n: string; title: string; ar: string; body: string }
export interface FoodProduct { title: string; short: string; ar: string; weight: string; swatch: string; body: string; image?: string }
export interface ModelStep { n: number; title: string; body: string; image: string }
export interface Feature { title: string; desc: string }
export interface Application { use: string; items: string }
export interface ImpactStat { value: string; label: string }
export interface GalleryItem { image: string; caption: string }
export interface NavLink { label: string; href: string }

export const PRODUCT_OPTIONS = ['Gum Arabic Hashab', 'Solar-dried foods', 'Other'] as const;
export type ProductOption = (typeof PRODUCT_OPTIONS)[number];

export type EnquirySource = 'contact' | 'quote-modal';
export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface EnquiryPayload {
  source: EnquirySource;
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  product?: ProductOption;
  volumeTonnes?: number;
  destinationCountry?: string;
  message?: string;
}
