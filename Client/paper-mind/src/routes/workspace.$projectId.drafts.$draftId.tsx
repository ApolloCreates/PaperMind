import { createFileRoute } from "@tanstack/react-router";

import { DraftEditorPage } from "@/components/draft_editor/DraftEditorPage";

export const Route = createFileRoute(
  "/workspace/$projectId/drafts/$draftId"
)({
  component: DraftEditorPage,
});