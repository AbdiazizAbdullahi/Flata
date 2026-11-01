export type Plan = {
  name: string;
  setup: string;
  monthly: string;
  summary: string;
  bestFor: string;
  includes: string[];
  featured?: boolean;
  note?: string;
};

export type Feature = { title: string; description: string };

export const siteConfig = {
  name: "Flata",
  tagline: "Good websites. Ongoing partnership.",
  description: "Website design, development and ongoing care for independent businesses. Based in Kenya, working internationally.",
  expectedUrl: "https://flata.site",
  serviceArea: "Nairobi and nearby areas, with other locations quoted separately",
  contact: {
    whatsapp: "254700000000",
    email: "flatasoftware@gmail.com",
    displayPhone: "+254 700 000 000",
    placeholders: true,
  },
  company: {
    legalName: "Flata Software",
    registration: "Business registration pending final confirmation",
  },
} as const;

export const features: Feature[] = [
  { title: "Sales and POS", description: "Record Cash, M-Pesa and credit sales with connected stock and customer records." },
  { title: "Inventory and restocking", description: "Track products, batches, stock movements, restocking and supplier-linked purchases." },
  { title: "Customers and suppliers", description: "Keep customer credit, payments, supplier balances and account activity in view." },
  { title: "Cashier shift control", description: "Open, check and close Cash and M-Pesa shifts with responsibility tied to the cashier." },
  { title: "Expenses and finance", description: "Record expenses, transactions and invoices, then review practical finance reports." },
  { title: "Reports and accountability", description: "Review sales, margin, stock audits, staff access and operational exceptions." },
];

export const plans: Plan[] = [
  {
    name: "Starter", setup: "KES 25,000", monthly: "KES 2,000/month",
    summary: "A controlled first system for a single counter.", bestFor: "One location, one till, up to three staff",
    includes: ["Core business modules", "Installation and setup", "One team training session", "Standard remote support"],
  },
  {
    name: "Growth", setup: "KES 50,000", monthly: "KES 4,000/month",
    summary: "More counters, more users and closer onboarding.", bestFor: "One location, up to three tills and ten staff",
    includes: ["Everything in Starter", "Multi-till setup", "Two team training sessions", "Priority remote support"], featured: true,
  },
  {
    name: "Multi-site", setup: "From KES 80,000", monthly: "From KES 8,000/month",
    summary: "Separate branch deployments with coordinated support.", bestFor: "Up to three separately configured locations",
    includes: ["Everything in Growth", "Branch-by-branch configuration", "Deployment planning", "Priority implementation support"],
    note: "Does not include consolidated cross-branch reporting at launch.",
  },
];

const whatsappMessage = `Hello Flata, I would like to book a Flata Business demo.\n\nBusiness name:\nLocation:\nBusiness type:\nNumber of tills:\nPreferred visit date:`;
export const whatsappUrl = (message = whatsappMessage) => `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`;

export const navItems = [
  ["Flata Business", "/flata-business"], ["Pricing", "/pricing"], ["Custom Software", "/custom-software"],
  ["Adeego Story", "/case-study"], ["About", "/about"], ["Contact", "/contact"],
] as const;
