import type { MainNavItem, SidebarNavItem } from "@/types/nav";

export interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
  chartsNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Tanstack Routing",
      href: "/tanstack-routing",
    },
    {
      title: "Tanstack Table & Query",
      href: "/tanstack-table-query",
    },
    {
      title: "Recharts",
      href: "/recharts",
    },
    {
      title: "Framer Motion",
      href: "/framer-motion",
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
          items: [],
        },
      ],
    },
  ],
  chartsNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs/charts",
          items: [],
        },
      ],
    },
  ],
};
