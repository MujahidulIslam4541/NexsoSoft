export interface ContactDetail {
  title: string;
  value: string;
  href?: string;
  type: 'email' | 'phone' | 'location';
}

export const CONTACT_HEADER = {
  title: "Let's Build Your Vision Together",
  subtitle:
    'Ready to turn your ideas into a high-performance reality? Reach out today and start your journey towards digital excellence.',
};

export const CONTACT_DETAILS: ContactDetail[] = [
  {
    title: 'Email Us',
    value: 'info@nexsosoft.com',
    href: 'mailto:info@nexsosoft.com',
    type: 'email',
  },
  {
    title: 'Call Us',
    value: '+880 01307164307',
    href: 'tel:+880 01307164307',
    type: 'phone',
  },
  {
    title: 'Availability',
    value: 'Global Distributed Team (Remote First)',
    type: 'location',
  },
];

