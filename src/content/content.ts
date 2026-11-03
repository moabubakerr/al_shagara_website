// All site copy and data lives here so an Arabic (RTL) version can be added later.
import type {
  Application,
  Feature,
  FoodProduct,
  GalleryItem,
  ImpactStat,
  ModelStep,
  NavLink,
  Pillar,
  Step,
} from '../types';

export const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61561040212605';

export const brand = {
  name: 'Al Shagara Gum Arabic (SGA)',
  wordmark: 'AL SHAGARA',
  ar: 'الشجرة للصمغ العربي',
  logo: '/img/logo-sga.jpg',
};

export const navLinks: NavLink[] = [
  { label: 'Value chain', href: '#chain' },
  { label: 'Mission', href: '#pillars' },
  { label: 'Gum arabic', href: '#product' },
  { label: 'Dried foods', href: '#foods' },
  { label: 'Sustainability', href: '#sustainability' },
  { label: 'People', href: '#people' },
];

export const copy = {
  header: {
    quote: 'Get a quote',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    skip: 'Skip to content',
  },
  hero: {
    titleBefore: 'Natural gum arabic, ',
    titleHighlight: 'sustainably harvested',
    titleAfter: ' and solar-dried.',
    body: "We turn the acacia's natural gum into a clean, export-grade product — processed locally with solar energy to support farmers and reduce waste.",
    cta: 'Request a quote',
    link: 'Follow the chain →',
    imageMain: { src: '/img/acacia-tear.jpg', alt: 'A tear of gum arabic hardening on an acacia branch' },
    imageSide: { src: '/img/gum-tears.jpg', alt: 'A pile of amber gum arabic tears' },
    caption: 'Hashab · Acacia senegal',
  },
  chain: {
    title: 'From branch to buyer, step by step.',
    helper: 'Select a stage to see how the gum moves from the branch to the container.',
    stage: (n: number, total: number) => `Stage ${n} of ${total}`,
    prev: 'Previous stage',
    next: 'Next stage',
    tablist: 'Value chain stages',
  },
  pillars: {
    eyebrow: 'What we stand for',
    title: 'Six commitments behind every bag.',
    body: 'Sustainable solar-dried foods, made locally — for stronger agriculture and stronger communities.',
  },
  product: {
    eyebrow: 'Flagship product',
    title: 'Gum Arabic Hashab',
    body: 'Hand-picked Acacia senegal tears, naturally sun-dried, mechanically cleaned and graded — ready for food, beverage and pharmaceutical manufacturers.',
    images: [
      { src: '/img/bag-label.jpg', alt: 'Close-up of an Al Shagara gum arabic bag label' },
      { src: '/img/kraft-bags.jpg', alt: 'Stacked kraft bags of gum arabic ready for export' },
    ],
    specs: [
      { label: 'Origin', value: 'Sudan' },
      { label: 'Species', value: 'A. senegal' },
      { label: 'Packing', value: '50 kg bags' },
    ],
  },
  foods: {
    eyebrow: 'Solar-dried foods',
    title: 'Local harvests, preserved by the sun.',
    pouchLabel: 'SUN-DRIED',
    comingSoon: {
      pill: 'Coming soon',
      title: 'Solar-dried farms in the Ailfoon region',
      ar: 'مزارع التجفيف الشمسي في منطقة العيلفون',
      body: 'We are building solar-drying farms in Ailfoon to process produce right where it is grown — bringing jobs, renewable energy and less post-harvest waste to the region.',
    },
    benefits: [
      { title: 'Longer shelf life', desc: 'Dried produce keeps for months without refrigeration.' },
      { title: 'Nutrients retained', desc: 'Gentle, low-temperature solar drying keeps colour and flavour.' },
      { title: 'Zero fuel', desc: 'Powered entirely by sunlight — no diesel, no emissions.' },
    ] satisfies Feature[],
  },
  sustainability: {
    eyebrow: 'Our sustainability model',
    title: 'A farm-gate, solar-powered food value chain.',
    taglines: [
      'Reducing food losses',
      'Empowering women farmers',
      'Preventing carbon emissions',
      'Delivering quality to customers',
    ],
    featuresLabel: 'Every product we make is',
    applicationsTitle: 'Product applications',
    applicationsBody: 'Our ingredients serve food manufacturers, food service and beverage producers.',
    applicationsHeadings: { use: 'Application', items: 'Products' },
    impactLabel: 'Our impact',
  },
  people: {
    eyebrow: 'People & CSR',
    title: 'Every grade is sorted by hand, close to home.',
    body: 'We buy directly from farmers and collectors, create seasonal work for women in nearby villages, and train teams in solar drying and post-harvest handling.',
    image: '/img/sorting-shed.jpg',
  },
  gallery: {
    title: 'Inside our facility',
    hint: 'Scroll →',
    prev: 'Scroll gallery left',
    next: 'Scroll gallery right',
  },
  contact: {
    title: 'Source gum arabic directly from Sudan.',
    body: "Share the grade, volume and destination — we'll reply with specifications and a quote.",
    submit: 'Request a quote',
    success: 'Thank you. Our sales team will be in touch shortly.',
    facebook: 'Follow us on Facebook →',
  },
  quote: {
    title: 'Request a quote',
    body: 'Tell us what you need. We reply within two working days.',
    close: 'Close',
    submit: 'Send request',
    success: 'Thank you. Our sales team will contact you shortly.',
  },
  form: {
    fullName: { label: 'Full name', placeholder: 'Your name' },
    company: { label: 'Company', placeholder: 'Company name' },
    email: { label: 'Email', placeholder: 'name@company.com' },
    phone: { label: 'Phone / WhatsApp', placeholder: '+249 …' },
    product: { label: 'Product', placeholder: 'Select a product' },
    volume: { label: 'Volume (tonnes)', placeholder: 'e.g. 20' },
    destination: { label: 'Destination country', placeholder: 'e.g. Germany' },
    contactMessage: { label: 'Message', placeholder: 'Product, grade, volume and destination' },
    quoteMessage: { label: 'Message', placeholder: 'Grade, packing or delivery requirements' },
    submitting: 'Sending…',
    error: 'Something went wrong. Please try again or email us directly.',
    errors: {
      fullName: 'Please enter your full name.',
      emailRequired: 'Please enter your email address.',
      emailInvalid: 'Please enter a valid email address.',
      phone: 'Please enter a valid phone number.',
      volume: 'Please enter a number of tonnes (0 or more).',
    },
  },
  footer: {
    origin: 'Product of Sudan',
  },
};

export const valueChainSteps: Step[] = [
  { title: 'Harvest', image: '/img/acacia-tear.jpg', body: 'Tears form where the acacia bark is tapped and are collected by hand once they harden on the branch.' },
  { title: 'Solar drying', image: '/img/sorting-shed-2.jpg', body: 'Gum is spread on tarps in open, shaded sheds and dried by the sun — no fuel, no emissions, less spoilage.' },
  { title: 'Hand sorting', image: '/img/drying-tarps.jpg', body: 'Trained teams sort each batch by size, colour and cleanliness to separate the grades.' },
  { title: 'Cleaning & grading', image: '/img/cleaning-machine.jpg', body: 'Mechanical cleaning removes bark and sand; our lab checks each lot before it is packed.' },
  { title: 'Pack & export', image: '/img/loading-truck.jpg', body: 'Packed in labelled 50 kg bags, palletised and loaded into containers at our own facility.' },
];

export const pillars: Pillar[] = [
  { n: '01', title: 'Local manufacturing', ar: 'التصنيع المحلي', body: 'Drying, cleaning, grading and packing happen in our own facility.' },
  { n: '02', title: 'Stronger value chains', ar: 'تعزيز سلاسل القيمة', body: 'Direct links between farmers, processors and buyers.' },
  { n: '03', title: 'Fewer post-harvest losses', ar: 'تقليل فاقد ما بعد الحصاد', body: 'Fast solar drying and covered storage protect the crop.' },
  { n: '04', title: 'Farmers and communities', ar: 'دعم المزارعين والمجتمعات', body: 'Steady income for growers, collectors and sorting teams.' },
  { n: '05', title: 'Renewable energy', ar: 'الطاقة المتجددة', body: 'The sun does the drying — clean, free and abundant.' },
  { n: '06', title: 'Corporate responsibility', ar: 'المسؤولية المجتمعية', body: 'Reinvesting in skills, livelihoods and acacia landscapes.' },
];

export const foods: FoodProduct[] = [
  { title: 'Dried tomato powder', short: 'Tomato powder', ar: 'بودرة الطماطم المجففة', weight: '250 g', swatch: 'radial-gradient(circle at 35% 35%,#e0664a,#9c2f1f)', body: 'Concentrated flavour and colour for sauces, soups and seasonings.' },
  { title: 'Dried okra powder', short: 'Okra powder', ar: 'بودرة البامية المجففة', weight: '250 g', swatch: 'radial-gradient(circle at 35% 35%,#9bb06a,#5d7436)', body: 'A traditional thickener for stews, ready to use all year round.' },
  { title: 'Dried onion powder', short: 'Onion powder', ar: 'بودرة البصل المجفف', weight: '250 g', swatch: 'radial-gradient(circle at 35% 35%,#f4e6c8,#cfae7a)', body: 'Fine, aromatic powder for cooking, spice blends and food processing.' },
  { title: 'Dried garlic powder', short: 'Garlic powder', ar: 'بودرة الثوم المجفف', weight: '250 g', swatch: 'radial-gradient(circle at 35% 35%,#faf3e3,#d8c6a0)', body: 'Pure garlic, sun-dried and milled — no additives.' },
];

export const sustainabilityModel: ModelStep[] = [
  { n: 1, title: 'Village-level sourcing', image: '/img/sorting-women.jpg', body: 'We buy gum and fresh produce directly from farmers and collectors at the farm gate — fair prices, paid locally, fully traceable.' },
  { n: 2, title: 'Farm-gate solar processing', image: '/img/drying-tarps.jpg', body: 'Produce is dried in clean, solar-powered units close to the farm, then sorted and milled by local teams — many of them women.' },
  { n: 3, title: 'Food & beverage customers', image: '/img/kraft-bags.jpg', body: 'Clean, shelf-stable ingredients reach manufacturers, food service and exporters — with less waste at every step.' },
];

export const productFeatures: Feature[] = [
  { title: 'No added preservatives', desc: 'Dried by the sun, nothing else.' },
  { title: 'Nutrient dense', desc: 'Low-heat drying keeps nutrients and colour.' },
  { title: 'Low carbon footprint', desc: 'Solar energy instead of diesel or gas.' },
  { title: 'Fully traceable', desc: 'Every lot traced back to its source.' },
  { title: 'Empowers women farmers', desc: 'Income for women in sourcing and processing.' },
];

export const applications: Application[] = [
  { use: 'Seasonings & spice blends', items: 'Onion, garlic and tomato powder' },
  { use: 'Soups & sauces', items: 'Tomato and onion powder' },
  { use: 'Stews & traditional dishes', items: 'Okra powder' },
  { use: 'Ready meals', items: 'Onion, garlic, tomato and okra powder' },
  { use: 'Beverages & confectionery', items: 'Gum arabic Hashab' },
  { use: 'Pharmaceuticals', items: 'Gum arabic Hashab' },
];

export const impact: ImpactStat[] = [ // PLACEHOLDERS — client to supply
  { value: '—', label: 'Farmers in our sourcing network' },
  { value: '—', label: 'Women employed in sourcing and processing' },
  { value: '—', label: 'Tonnes of post-harvest losses prevented' },
  { value: '—', label: 'Tonnes of CO₂ avoided with solar drying' },
];

export const gallery: GalleryItem[] = [
  { image: '/img/warehouse-1.jpg', caption: 'Warehouse' },
  { image: '/img/lab-2.jpg', caption: 'Quality lab' },
  { image: '/img/bagging.jpg', caption: 'Bagging line' },
  { image: '/img/pallets.jpg', caption: 'Palletised stock' },
  { image: '/img/facility-exterior.jpg', caption: 'Loading bay' },
  { image: '/img/container-2.jpg', caption: 'Container loading' },
  { image: '/img/hall.jpg', caption: 'Processing hall' },
];
