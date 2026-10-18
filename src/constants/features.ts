import { Code, Server, Sparkles, Cloud, Database, Layout, type LucideIcon } from 'lucide-react';

export interface ServiceItem {
  title: string;
  description: string;
  icon: LucideIcon;
  number: string;
  featured: boolean;
  color: string;
  iconColor: string;
  border: string;
}

export const FEATURES_HEADER = {
  badge: 'What we offer',
  title: 'Services built for',
  highlightText: 'scale & precision',
  subtitle:
    'From ideation to deployment — high-performance applications that drive your business forward.',
};

export const SERVICES: ServiceItem[] = [
  {
    title: 'UI/UX Design',
    description:
      'Designing intuitively beautiful and responsive user interfaces with Tailwind CSS that prioritize user engagement.',
    icon: Layout,
    number: '01',
    featured: true,
    color: 'from-violet-500/10 to-purple-500/5',
    iconColor: 'text-violet-600',
    border: 'group-hover:border-violet-500/30',
  },
  {
    title: 'Modern Web Development',
    description:
      'High-performance, SEO-optimized web applications built with React and Next.js for a seamless user experience.',
    icon: Code,
    number: '02',
    featured: false,
    color: 'from-sky-500/10 to-blue-500/5',
    iconColor: 'text-sky-600',
    border: 'group-hover:border-sky-500/30',
  },
  {
    title: 'Scalable Backend Systems',
    description:
      'Secure and reliable server-side logic using Node.js, NestJS, and Laravel to power your complex business processes.',
    icon: Server,
    number: '03',
    featured: false,
    color: 'from-emerald-500/10 to-green-500/5',
    iconColor: 'text-emerald-600',
    border: 'group-hover:border-emerald-500/30',
  },
  {
    title: 'AI-Driven Applications',
    description:
      'Elevating your business with custom AI integrations, leveraging OpenAI and modern LLMs to automate and innovate.',
    icon: Sparkles,
    number: '04',
    featured: false,
    color: 'from-amber-500/10 to-orange-500/5',
    iconColor: 'text-amber-600',
    border: 'group-hover:border-amber-500/30',
  },
  {
    title: 'Cloud & DevOps',
    description:
      'Optimizing deployments with AWS and Docker for maximum scalability, reliability, and security of your digital infrastructure.',
    icon: Cloud,
    number: '05',
    featured: false,
    color: 'from-cyan-500/10 to-teal-500/5',
    iconColor: 'text-cyan-600',
    border: 'group-hover:border-cyan-500/30',
  },
  {
    title: 'Database Management',
    description:
      'Efficient data modelling and management using Prisma, MongoDB, and MySQL to ensure your data stays organized and secure.',
    icon: Database,
    number: '06',
    featured: false,
    color: 'from-rose-500/10 to-pink-500/5',
    iconColor: 'text-rose-600',
    border: 'group-hover:border-rose-500/30',
  },
];

