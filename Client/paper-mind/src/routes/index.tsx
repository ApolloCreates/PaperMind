import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage } from "@/components/dashboard/DashboardPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — PaperMind" },
      { name: "description", content: "PaperMind is an AI-powered research assistant. Manage projects, papers, drafts, and AI reviews from a single dashboard." },
      { property: "og:title", content: "PaperMind — AI Research Dashboard" },
      { property: "og:description", content: "Manage research projects and AI workflows with PaperMind." },
    ],
  }),
  component: DashboardPage,
});
