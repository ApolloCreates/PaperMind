import type { LucideIcon } from "lucide-react";

export type StudioPaper = {
  project_id: string;
  id: string;
  title: string;
  filename: string;
  pages: number;
  status: "ready" | "processing" | "failed";
};

export type StudioSession = {
  id: string;
  title: string;
  timestamp: string;
  active?: boolean;
  workflow?: string;
};

export type StudioSource = {
  id: string;
  paperTitle: string;
  page: number;
  relevance: number;
  snippet?: string;
};

export type StudioMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: StudioSource[];
  createdAt: string;
};

export type WorkflowRequirement = "one-paper" | "multi-paper" | "topic-optional-papers";

export type StudioTool = {
  id:
    | "chat"
    | "summary"
    | "literature"
    | "gap"
    | "topics"
    | "writer"
    | "reviewer";
  emoji: string;
  icon: LucideIcon;
  title: string;
  description: string;
  requires: WorkflowRequirement;
  requiresLabel: string;
};
