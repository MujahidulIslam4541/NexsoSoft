const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Create Default Admin User
  const adminUsername = 'admin';
  const adminPassword = 'adminpassword';
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { username: adminUsername },
    update: {},
    create: {
      username: adminUsername,
      passwordHash: passwordHash,
    },
  });
  console.log(`- Admin user created (Username: ${adminUsername}, Password: ${adminPassword})`);

  // 2. Seed Hero Settings
  await prisma.heroSettings.upsert({
    where: { id: 'hero' },
    update: {},
    create: {
      id: 'hero',
      title: 'We Build Scalable Software Solutions',
      subtitle: 'We engineer high-performance web applications, mobile apps, and custom systems that help modern businesses grow and scale.',
      ctaText: 'Build Your Vision',
      ctaHref: '#contact',
    },
  });
  console.log('- Hero Settings seeded');

  // 3. Seed Feature Items
  const features = [
    {
      title: 'UI/UX Design',
      description: 'Designing intuitively beautiful and responsive user interfaces with Tailwind CSS that prioritize user engagement.',
      iconName: 'Layout',
      order: 1,
    },
    {
      title: 'Modern Web Development',
      description: 'High-performance, SEO-optimized web applications built with React and Next.js for a seamless user experience.',
      iconName: 'Code',
      order: 2,
    },
    {
      title: 'Scalable Backend Systems',
      description: 'Secure and reliable server-side logic using Node.js, NestJS, and Laravel to power your complex business processes.',
      iconName: 'Server',
      order: 3,
    },
    {
      title: 'AI-Driven Applications',
      description: 'Elevating your business with custom AI integrations, leveraging OpenAI and modern LLMs to automate and innovate.',
      iconName: 'Sparkles',
      order: 4,
    },
    {
      title: 'Cloud & DevOps',
      description: 'Optimizing deployments with AWS and Docker for maximum scalability, reliability, and security of your digital infrastructure.',
      iconName: 'Cloud',
      order: 5,
    },
    {
      title: 'Database Management',
      description: 'Efficient data modelling and management using Prisma, MongoDB, and MySQL to ensure your data stays organized and secure.',
      iconName: 'Database',
      order: 6,
    },
  ];

  await prisma.featureItem.deleteMany({});
  for (const f of features) {
    await prisma.featureItem.create({ data: f });
  }
  console.log('- Feature Items seeded');

  // 4. Seed Process Steps
  const steps = [
    {
      stepNumber: 1,
      title: 'Discovery',
      description: 'We analyze all project requirements to understand your core business logic. Provide clear obligations and technical evaluations to start solutions together. Establish a strategic roadmap and clear project goals from day one.',
    },
    {
      stepNumber: 2,
      title: 'Design',
      description: 'In the design phase, the visual identity and UI/UX of your project is refined. The prototype is developed iteratively until reaching your complete satisfaction. Additions are meticulously recorded and incorporated into the development blueprint.',
    },
    {
      stepNumber: 3,
      title: 'Development',
      description: 'Full-scale implementation begins based on the approved high-fidelity prototypes. We use modern stacks like React and Next.js to ensure performance and scalability. You will receive regular updates and transparent progress on ongoing work.',
    },
    {
      stepNumber: 4,
      title: 'Testing',
      description: 'Comprehensive feature testing ensures every functionality works flawlessly. Quality assurance is our most critical step before handing over the project. Every correction needed is logged and addressed to achieve a zero-bug state.',
    },
    {
      stepNumber: 5,
      title: 'Improvement',
      description: 'Findings from the rigorous testing phase are corrected and deeply implemented. We polish the user experience and optimize performance for production. The client reviews the final product through a transparent proofing process.',
    },
    {
      stepNumber: 6,
      title: 'Completion',
      description: 'Finally, your software is live, properly integrated, and working perfectly. We provide a full handover of production assets and essential documentation. We ensure you are 100% satisfied with the outcome of your new platform.',
    },
  ];

  await prisma.processStep.deleteMany({});
  for (const s of steps) {
    await prisma.processStep.create({ data: s });
  }
  console.log('- Process Steps seeded');

  // 5. Seed Stats
  const stats = [
    { number: '50', label: 'Projects completed and delivered.', icon: 'CheckCircle' },
    { number: '15', label: 'Happy clients from around the world.', icon: 'Users' },
    { number: 'Top Rated', label: 'Trusted by our partners daily.', icon: 'Star' },
  ];

  await prisma.statItem.deleteMany({});
  for (const s of stats) {
    await prisma.statItem.create({ data: s });
  }
  console.log('- Stat Items seeded');

  // 6. Seed FAQs
  const faqs = [
    {
      question: 'What types of software services do you provide?',
      answer: 'We specialize in custom web applications, mobile app development (iOS & Android), and backend systems. Whether you need a modern website or a complex business tool, we have the expertise to build it.',
      iconName: 'code-2',
      order: 1,
    },
    {
      question: 'What technology stack do you use?',
      answer: 'We primarily work with React, Next.js, and Node.js for high-performance applications. For styling and UI, we use Tailwind CSS, and for database management, we rely on modern solutions like Supabase, PostgreSQL, and MongoDB.',
      iconName: 'cpu',
      order: 2,
    },
    {
      question: 'How long does it take to complete a project?',
      answer: 'A typical project can take anywhere from 4 to 12 weeks depending on its size and complexity. We follow an agile process, delivering parts of the software in small phases so you can see progress early and often.',
      iconName: 'calendar',
      order: 3,
    },
    {
      question: 'How do we communicate during development?',
      answer: 'Communication is key to our success. We use tools like Slack for daily updates and hold weekly video calls to show you the latest progress. You will have a dedicated project manager to answer any questions at any time.',
      iconName: 'message-square',
      order: 4,
    },
    {
      question: 'Do you offer support after the project is finished?',
      answer: 'Yes, we provide ongoing maintenance and support packages to ensure your software stays secure and updated. We are always here to help you add new features or fix any issues as your business grows.',
      iconName: 'life-buoy',
      order: 5,
    },
  ];

  await prisma.fAQItem.deleteMany({});
  for (const f of faqs) {
    await prisma.fAQItem.create({ data: f });
  }
  console.log('- FAQ Items seeded');

  // 7. Seed Testimonials
  const testimonials = [
    {
      clientName: 'Tanvir Ahmed',
      role: 'Founder of ShopEase BD',
      feedback: 'StackMajix helped us scale our delivery platform during the peak festive season. Their technical support and 24/7 availability were lifesavers for our local business.',
      rating: 5,
      avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=250&h=250&auto=format&fit=crop',
    },
    {
      clientName: 'David Miller',
      role: 'Tech Lead at RetailHub',
      feedback: "We needed a reliable partner for our cloud transition. They didn't just perform the migration; they optimized our entire workflow for performance.",
      rating: 5,
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=250&h=250&auto=format&fit=crop',
    },
    {
      clientName: 'James Wilson',
      role: 'Operations Manager',
      feedback: "The software they developed for our inventory tracking has been zero-bug for over 6 months now. It's exactly what we needed for our warehouse teams.",
      rating: 5,
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=250&h=250&auto=format&fit=crop',
    },
    {
      clientName: 'Robert Smith',
      role: 'Software Architect',
      feedback: "Their code quality is cleaner than anything we've seen from other external partners. They follow best practices religiously and it shows in the final product.",
      rating: 5,
      avatarUrl: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=250&h=250&auto=format&fit=crop',
    },
  ];

  await prisma.testimonialItem.deleteMany({});
  for (const t of testimonials) {
    await prisma.testimonialItem.create({ data: t });
  }
  console.log('- Testimonials seeded');

  console.log('Seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
