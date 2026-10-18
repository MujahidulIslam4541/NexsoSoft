export interface HeroData {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
}

export const HERO_DATA: HeroData = {
  title: 'We Build Scalable Software Solutions',
  subtitle: 'We engineer high-performance web applications, mobile apps, and custom systems that help modern businesses grow and scale.',
  ctaText: 'Build Your Vision',
  ctaHref: '#contact',
};

export const HERO_STAT_BADGES = [
  { value: '50+ Projects', label: 'Delivered globally', delay: 1100 },
  { value: '15+ Clients',  label: 'Around the world',  delay: 1250 },
  { value: 'Top Rated',    label: 'Trusted partners',  delay: 1400 },
];

