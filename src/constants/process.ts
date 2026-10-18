export interface ProcessStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
}

export const PROCESS_HEADER = {
  title: 'Our Strategic Development Process',
  subtitle:
    'We partner with you to engineer solutions that scale. From initial discovery to final deployment, we ensure every step is handled with architectural precision.',
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'step-1',
    stepNumber: 1,
    title: 'Discovery',
    description:
      'We analyze all project requirements to understand your core business logic.\nProvide clear obligations and technical evaluations to start solutions together.\nEstablish a strategic roadmap and clear project goals from day one.',
  },
  {
    id: 'step-2',
    stepNumber: 2,
    title: 'Design',
    description:
      'In the design phase, the visual identity and UI/UX of your project is refined.\nThe prototype is developed iteratively until reaching your complete satisfaction.\nAdditions are meticulously recorded and incorporated into the development blueprint.',
  },
  {
    id: 'step-3',
    stepNumber: 3,
    title: 'Development',
    description:
      'Full-scale implementation begins based on the approved high-fidelity prototypes.\nWe use modern stacks like React and Next.js to ensure performance and scalability.\nYou will receive regular updates and transparent progress on ongoing work.',
  },
  {
    id: 'step-4',
    stepNumber: 4,
    title: 'Testing',
    description:
      'Comprehensive feature testing ensures every functionality works flawlessly.\nQuality assurance is our most critical step before handing over the project.\nEvery correction needed is logged and addressed to achieve a zero-bug state.',
  },
  {
    id: 'step-5',
    stepNumber: 5,
    title: 'Improvement',
    description:
      'Findings from the rigorous testing phase are corrected and deeply implemented.\nWe polish the user experience and optimize performance for production.\nThe client reviews the final product through a transparent proofing process.',
  },
  {
    id: 'step-6',
    stepNumber: 6,
    title: 'Completion',
    description:
      'Finally, your software is live, properly integrated, and working perfectly.\nWe provide a full handover of production assets and essential documentation.\nWe ensure you are 100% satisfied with the outcome of your new platform.',
  },
];

export const LOTTIE_URLS: Record<number, string> = {
  1: 'https://lottie.host/8ddf9e05-d506-4b9d-ba65-0725c4242e9f/gyX6LlaFMh.lottie',
  2: 'https://lottie.host/e451eb3b-f24e-43e3-a5ea-3df9dd43f11a/6SuhbeUjIk.lottie',
  3: 'https://lottie.host/a0d03b15-c39c-4004-8bb9-72b843eba18c/q2EvKtZs3x.lottie',
  4: 'https://lottie.host/b685a7d3-2953-4368-bc22-7eaa8100ca32/is83ivHM4F.lottie',
  5: 'https://lottie.host/e882bf67-e306-42a8-b6de-2f4b48aaf968/1qFH4uxT22.lottie',
  6: 'https://lottie.host/df2ce67b-7845-4c8d-af43-1943d139397b/WX6N92vYMy.lottie',
};

