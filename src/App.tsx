import { useCallback, useState } from 'react';
import { ContactSection } from './components/ContactSection';
import { DriedFoods } from './components/DriedFoods';
import { FacilityGallery } from './components/FacilityGallery';
import { Footer } from './components/Footer';
import { GumArabicFeature } from './components/GumArabicFeature';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { People } from './components/People';
import { Pillars } from './components/Pillars';
import { QuoteModal } from './components/QuoteModal';
import { Sustainability } from './components/Sustainability';
import { ValueChain } from './components/ValueChain';

export default function App() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const closeQuote = useCallback(() => setQuoteOpen(false), []);

  return (
    <>
      <Header onOpenQuote={() => setQuoteOpen(true)} />
      <main id="main">
        <Hero />
        <ValueChain />
        <Pillars />
        <GumArabicFeature />
        <DriedFoods />
        <Sustainability />
        <People />
        <FacilityGallery />
        <ContactSection />
      </main>
      <Footer />
      <QuoteModal open={quoteOpen} onClose={closeQuote} />
    </>
  );
}
