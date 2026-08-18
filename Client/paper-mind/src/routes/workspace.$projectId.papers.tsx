import { createFileRoute } from "@tanstack/react-router";

import { PapersPage } from "@/components/papers/PaperPage";

export const Route = createFileRoute(
  "/workspace/$projectId/papers"
)({
  component: PapersPage,
});