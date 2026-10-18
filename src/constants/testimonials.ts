export interface TestimonialItem {
  avatar: string;
  name: string;
  role: string;
  quote: string;
  accent: string;
}

export const TESTIMONIALS_HEADER = {
  badge: 'Client stories',
  title: 'Trusted by',
  highlightText: 'Industry Leaders',
  subtitle:
    "We've collaborated with fast-growing startups and established enterprises to build software that moves the needle.",
};

export const TESTIMONIALS: TestimonialItem[] = [
  {
    avatar:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=250&h=250&auto=format&fit=crop',
    name: 'Tanvir Ahmed',
    role: 'Founder of ShopEase BD',
    quote:
      'StackMajix helped us scale our delivery platform during the peak festive season. Their technical support and 24/7 availability were lifesavers for our local business.',
    accent: 'from-emerald-500/10 to-primary/5',
  },
  {
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=250&h=250&auto=format&fit=crop',
    name: 'David Miller',
    role: 'Tech Lead at RetailHub',
    quote:
      "We needed a reliable partner for our cloud transition. They didn't just perform the migration; they optimized our entire workflow for performance.",
    accent: 'from-sky-500/10 to-blue-500/5',
  },
  {
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=250&h=250&auto=format&fit=crop',
    name: 'James Wilson',
    role: 'Operations Manager',
    quote:
      "The software they developed for our inventory tracking has been zero-bug for over 6 months now. It's exactly what we needed for our warehouse teams.",
    accent: 'from-violet-500/10 to-purple-500/5',
  },
  {
    avatar:
      'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=250&h=250&auto=format&fit=crop',
    name: 'Robert Smith',
    role: 'Software Architect',
    quote:
      "Their code quality is cleaner than anything we've seen from other external partners. They follow best practices religiously and it shows in the final product.",
    accent: 'from-amber-500/10 to-orange-500/5',
  },
];

