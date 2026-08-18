import { createFileRoute } from "@tanstack/react-router";
import { ProjectsPage } from "@/components/projects/ProjectsPage";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — PaperMind" },
      {
        name: "description",
        content: "Create and manage AI-powered research projects on PaperMind.",
      },
      { property: "og:title", content: "Projects — PaperMind" },
      {
        property: "og:description",
        content: "Create and manage AI-powered research projects on PaperMind.",
      },
    ],
  }),
  component: ProjectsPage,
});
