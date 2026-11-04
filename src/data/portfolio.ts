export type PortfolioItem = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  year: string;
  accent: "signal" | "volt" | "ember";
  comingSoon?: boolean;
};

// Replace each entry's title/category/summary/year with real project details
// as they ship — the grid and card layout need no changes.
export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    slug: "project-one",
    title: "Case study coming soon",
    category: "Custom Software",
    summary: "A forthcoming project write-up — check back shortly, or ask us directly.",
    year: "2026",
    accent: "signal",
    comingSoon: true,
  },
  {
    slug: "project-two",
    title: "Case study coming soon",
    category: "Web Application",
    summary: "A forthcoming project write-up — check back shortly, or ask us directly.",
    year: "2026",
    accent: "volt",
    comingSoon: true,
  },
  {
    slug: "project-three",
    title: "Case study coming soon",
    category: "Mobile App",
    summary: "A forthcoming project write-up — check back shortly, or ask us directly.",
    year: "2026",
    accent: "ember",
    comingSoon: true,
  },
  {
    slug: "project-four",
    title: "Case study coming soon",
    category: "System Integration",
    summary: "A forthcoming project write-up — check back shortly, or ask us directly.",
    year: "2026",
    accent: "signal",
    comingSoon: true,
  },
  {
    slug: "project-five",
    title: "Case study coming soon",
    category: "API Integration",
    summary: "A forthcoming project write-up — check back shortly, or ask us directly.",
    year: "2026",
    accent: "volt",
    comingSoon: true,
  },
  {
    slug: "project-six",
    title: "Case study coming soon",
    category: "Website",
    summary: "A forthcoming project write-up — check back shortly, or ask us directly.",
    year: "2026",
    accent: "ember",
    comingSoon: true,
  },
];
