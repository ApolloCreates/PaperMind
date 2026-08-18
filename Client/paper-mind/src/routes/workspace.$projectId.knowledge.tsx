import { createFileRoute } from "@tanstack/react-router";

import { KnowledgePage } from "@/components/workspace/knowledge/KnowledgePage";

export const Route = createFileRoute(
  "/workspace/$projectId/knowledge"
)({
  component: KnowledgePage,
});