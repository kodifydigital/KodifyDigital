export type Service = {
  slug: string;
  index: string;
  title: string;
  short: string;
  description: string;
  bullets: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "custom-software",
    index: "01",
    title: "Custom Software Development",
    short: "Purpose-built systems instead of stretched spreadsheets.",
    description:
      "We design and build bespoke software around your actual workflow — from internal tooling and dashboards to full operational platforms — so you stop bending your process to fit off-the-shelf software.",
    bullets: [
      "Requirements discovery & solution architecture",
      "Full-stack build with modern, maintainable stacks",
      "Scalable data models & clean API design",
    ],
  },
  {
    slug: "web-mobile-apps",
    index: "02",
    title: "Web & Mobile App Development",
    short: "Fast, native-feeling apps for web, iOS, and Android.",
    description:
      "From customer-facing web apps to cross-platform mobile products, we ship interfaces that feel considered — performant, accessible, and built to scale with your user base.",
    bullets: [
      "Responsive web apps & progressive web apps",
      "Cross-platform mobile (iOS & Android)",
      "Design systems & component libraries",
    ],
  },
  {
    slug: "websites",
    index: "03",
    title: "Websites",
    short: "Marketing sites and web platforms that load fast and convert.",
    description:
      "Corporate sites, landing pages, and content platforms engineered for speed, SEO, and a visual identity that actually represents your brand — not a recycled template.",
    bullets: [
      "Custom design, not theme-based",
      "SEO-first architecture & Core Web Vitals",
      "CMS integration for easy content updates",
    ],
  },
  {
    slug: "it-consultancy",
    index: "04",
    title: "IT Consultancy",
    short: "Clear technical direction before you spend a ringgit on build.",
    description:
      "We help you evaluate technology decisions, audit existing systems, and plan a roadmap — so budget goes toward the right architecture the first time.",
    bullets: [
      "Technology audits & feasibility studies",
      "Architecture & vendor evaluation",
      "Digital transformation roadmaps",
    ],
  },
  {
    slug: "system-integration",
    index: "05",
    title: "System Integration",
    short: "Make your existing tools talk to each other.",
    description:
      "We connect ERPs, CRMs, payment gateways, and internal tools into one coherent flow of data, removing manual re-entry and disconnected processes.",
    bullets: [
      "ERP / CRM / POS integrations",
      "Middleware & data pipeline design",
      "Legacy system modernization",
    ],
  },
  {
    slug: "api-integration",
    index: "06",
    title: "API Integration",
    short: "Third-party services, wired in cleanly and reliably.",
    description:
      "Payment gateways, logistics, government e-services, messaging platforms — we integrate the APIs your business depends on, with proper error handling and monitoring.",
    bullets: [
      "Payment gateway & e-commerce APIs",
      "Third-party & government e-service APIs",
      "Webhooks, auth, and rate-limit handling",
    ],
  },
  {
    slug: "maintenance",
    index: "07",
    title: "Maintenance & Support",
    short: "Ongoing care so systems stay fast, secure, and current.",
    description:
      "Software isn't a one-time delivery. We provide monitoring, bug fixes, security patches, and iterative improvements so your platform keeps up with your business.",
    bullets: [
      "SLA-backed support plans",
      "Security patching & dependency upkeep",
      "Performance monitoring & optimization",
    ],
  },
];
