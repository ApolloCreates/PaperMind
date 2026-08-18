import { createFileRoute } from "@tanstack/react-router";

import { WorkspaceLayout } from "@/components/workspace/WorkspaceLayout";

export const Route = createFileRoute(
  "/workspace/$projectId"
)({
  component: WorkspaceLayout,
});