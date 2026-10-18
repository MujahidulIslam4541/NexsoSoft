export interface NavItem {
  name: string;
  href: string;
}

export interface FooterLinkGroup {
  group: string;
  items: {
    title: string;
    href: string;
  }[];
}

export const NAV_MENU_ITEMS: NavItem[] = [
  { name: 'Features', href: '/#features' },
  { name: 'Solution', href: '/#solution' },
  { name: 'Stats', href: '/#stats' },
  { name: 'About', href: '/#about' },
  { name: 'Careers', href: '/careers' },
];

export const FOOTER_LINKS: FooterLinkGroup[] = [
  {
    group: 'Services',
    items: [
      { title: 'Web Development', href: '#features' },
      { title: 'Mobile Applications', href: '#features' },
      { title: 'Cloud Solutions', href: '#features' },
      { title: 'System Architecture', href: '#solution' },
    ],
  },
  {
    group: 'Company',
    items: [
      { title: 'Our Features', href: '#features' },
      { title: 'Development Process', href: '#solution' },
      { title: 'Success Stories', href: '#stats' },
      { title: 'About Us', href: '#about' },
    ],
  },
  {
    group: 'Legal',
    items: [
      { title: 'Privacy Policy', href: '/privacy-policy' },
      { title: 'Terms of Service', href: '/terms-of-service' },
      { title: 'Cookie Policy', href: '/cookie-policy' },
    ],
  },
];

