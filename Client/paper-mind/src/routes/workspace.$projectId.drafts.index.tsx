import { createFileRoute } from "@tanstack/react-router";

import { DraftsPage } from "@/components/workspace/drafts/DraftsPage";

export const Route = createFileRoute(
  "/workspace/$projectId/drafts/"
)({
  component: DraftsPage,
});