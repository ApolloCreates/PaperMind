import {
  LayoutDashboard,
  FileText,
  PenSquare,
  Sparkles,
  Download,
  Settings,
} from "lucide-react";

import { Link, useRouterState } from "@tanstack/react-router";

const tabs = [
  {
    label: "Overview",
    to: "/workspace/$projectId",
    icon: LayoutDashboard,
  },
  {
    label: "Papers",
    to: "/workspace/$projectId/papers",
    icon: FileText,
  },
  {
    label: "AI Studio",
    to: "/workspace/$projectId/ai-studio",
    icon: Sparkles,
  },
  {
    label: "Drafts",
    to: "/workspace/$projectId/drafts",
    icon: PenSquare,
  },
  {
    label: "Export",
    to: "/workspace/$projectId/export",
    icon: Download,
  },
  {
    label: "Settings",
    to: "/workspace/$projectId/settings",
    icon: Settings,
  },
];

export function WorkspaceTabs({
  projectId,
}: {
  projectId: string;
}) {
  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  });

  return (
    <div className="mb-8 border-b">
      <div className="flex gap-2 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;

          const href = tab.to.replace("$projectId", projectId);

          const active =
            pathname === href ||
            pathname.startsWith(`${href}/`);

          return (
            <Link
              key={tab.label}
              to={tab.to}
              params={{ projectId }}
              className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors
                ${
                  active
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:border-muted hover:text-foreground"
                }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}