import {
  FileText,
  PenSquare,
  Sparkles,
  Bot,
  BookOpen,
  SquarePen,
  Download,
  LayoutDashboard,
} from "lucide-react";

import { Link, useRouterState } from "@tanstack/react-router";

const items = [
  {
    title: "Overview",
    href: "",
    icon: LayoutDashboard,
  },
  {
    title: "Papers",
    href: "/papers",
    icon: FileText,
  },
  {
    title: "Drafts",
    href: "/drafts",
    icon: PenSquare,
  },
  {
    title: "Knowledge Base",
    href: "/knowledge",
    icon: BookOpen,
  },
  {
    title: "AI Research",
    href: "/research",
    icon: Sparkles,
  },
  {
    title: "Reviewer",
    href: "/reviewer",
    icon: Bot,
  },
  {
    title: "Editor",
    href: "/editor",
    icon: SquarePen,
  },
  {
    title: "Export",
    href: "/export",
    icon: Download,
  },
];

export function WorkspaceNav({
  projectId,
}: {
  projectId: string;
}) {
  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  });

  return (
    <div className="mb-8 flex flex-wrap gap-2">

      {items.map((item) => {

        const Icon = item.icon;

        const to = `/workspace/${projectId}${item.href}`;

        const active = pathname === to;

        return (

          <Link
            key={item.title}
            to={to}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm transition-all

            ${
              active
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-accent"
            }`}
          >

            <Icon className="h-4 w-4" />

            {item.title}

          </Link>

        );

      })}

    </div>
  );
}