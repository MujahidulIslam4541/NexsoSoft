export interface FAQItem {
  id: string;
  icon: string;
  question: string;
  answer: string;
}

export const FAQ_HEADER = {
  badge: 'Common Questions',
  title: 'Frequently Asked',
  highlightText: 'Questions',
  supportText: "Can't find what you're looking for? Contact our",
};

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'item-1',
    icon: 'code-2',
    question: 'What types of software services do you provide?',
    answer:
      'We specialize in custom web applications, mobile app development (iOS & Android), and backend systems. Whether you need a modern website or a complex business tool, we have the expertise to build it.',
  },
  {
    id: 'item-2',
    icon: 'cpu',
    question: 'What technology stack do you use?',
    answer:
      'We primarily work with React, Next.js, and Node.js for high-performance applications. For styling and UI, we use Tailwind CSS, and for database management, we rely on modern solutions like Supabase, PostgreSQL, and MongoDB.',
  },
  {
    id: 'item-3',
    icon: 'calendar',
    question: 'How long does it take to complete a project?',
    answer:
      'A typical project can take anywhere from 4 to 12 weeks depending on its size and complexity. We follow an agile process, delivering parts of the software in small phases so you can see progress early and often.',
  },
  {
    id: 'item-4',
    icon: 'message-square',
    question: 'How do we communicate during development?',
    answer:
      'Communication is key to our success. We use tools like Slack for daily updates and hold weekly video calls to show you the latest progress. You will have a dedicated project manager to answer any questions at any time.',
  },
  {
    id: 'item-5',
    icon: 'life-buoy',
    question: 'Do you offer support after the project is finished?',
    answer:
      'Yes, we provide ongoing maintenance and support packages to ensure your software stays secure and updated. We are always here to help you add new features or fix any issues as your business grows.',
  },
];

