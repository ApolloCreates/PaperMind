import { createFileRoute } from "@tanstack/react-router";
import { AIStudioPage } from "@/components/ai_studio/AIStudioPage";

export const Route = createFileRoute(
  "/workspace/$projectId/ai-studio"
)({
  component: AIStudioPage,
});