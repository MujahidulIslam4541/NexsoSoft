import { Code, Server, Sparkles, Cloud, Database, Layout } from "lucide-react";

const SERVICES = [
  {
    title: "UI/UX Design",
    description:
      "Designing intuitively beautiful and responsive user interfaces with Tailwind CSS that prioritize user engagement.",
    icon: Layout,
    number: "01",
  },
  {
    title: "Modern Web Development",
    description:
      "High-performance, SEO-optimized web applications built with React and Next.js for a seamless user experience.",
    icon: Code,
    number: "02",
  },
  {
    title: "Scalable Backend Systems",
    description:
      "Secure and reliable server-side logic using Node.js, NestJS, and Laravel to power your complex business processes.",
    icon: Server,
    number: "03",
  },
  {
    title: "AI-Driven Applications",
    description:
      "Elevating your business with custom AI integrations, leveraging OpenAI and modern LLMs to automate and innovate.",
    icon: Sparkles,
    number: "04",
  },
  {
    title: "Cloud & DevOps",
    description:
      "Optimizing deployments with AWS and Docker for maximum scalability, reliability, and security of your digital infrastructure.",
    icon: Cloud,
    number: "05",
  },
  {
    title: "Database Management",
    description:
      "Efficient data modelling and management using Prisma, MongoDB, and MySQL to ensure your data stays organized and secure.",
    icon: Database,
    number: "06",
  },
];

function ServiceCard({ service }: { service: (typeof SERVICES)[0] }) {
  const Icon = service.icon;

  return (
    <div className="relative flex flex-col gap-4 p-8 border-r border-b border-slate-200 transition-colors duration-300 hover:bg-green-50 group overflow-hidden">
      {/* Top accent line on hover - green on scroll */}
      <div className="absolute top-0 left-0 right-0 h-px bg-primary scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />

      {/* Number */}
      <span className="text-xs tracking-[0.2em] font-medium text-slate-400 uppercase">
        {service.number}
      </span>

      {/* Icon */}
      <div className="w-11 h-11 flex items-center justify-center border border-primary bg-green-50 rounded-xl group-hover:border-green-600 group-hover:bg-green-100 transition-all duration-300">
        <Icon
          size={18}
          className="text-primary group-hover:text-green-700 transition-colors duration-300"
        />
      </div>

      {/* Title */}
      <h3 className="text-2xl font-semibold text-slate-900 leading-snug">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-slate-600 leading-relaxed font-light flex-1">
        {service.description}
      </p>
    </div>
  );
}

export default function Features() {
  return (
    <section className=" bg-white">
      {/* "bg-[linear-gradient(to_bottom,var(--background)_0%,white_30%,white_100%)]" */}
      <div className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-px bg-primary" />
                <span className="text-xs tracking-[0.2em] uppercase text-primary font-medium">
                  What we offer
                </span>
              </div>

              <h2 className="text-4xl capitalize md:text-5xl font-semibold text-slate-900 leading-tight tracking-tight">
                Services built for
                <br />
                <span className="text-green-500">scale &amp; precision</span>
              </h2>
            </div>

            <p className="text-sm text-slate-500 leading-relaxed max-w-xs font-light">
              From ideation to deployment — high-performance applications that
              drive your business forward.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-slate-200 rounded-2xl overflow-hidden">
            {SERVICES.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
