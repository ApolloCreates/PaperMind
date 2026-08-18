import { createFileRoute } from "@tanstack/react-router";

import { WorkspaceOverviewPage } from "../components/workspace/WorkspaceOverviewPage";

export const Route = createFileRoute(
  "/workspace/$projectId/"
)({
  component: WorkspaceOverviewPage,
});