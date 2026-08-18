import type { Draft } from "./draft";
import type { Paper } from "./paper";
import type { Project } from "./project";

export interface WorkspaceStats {
  papers: number;
  drafts: number;
  reviews: number;
}

export interface Workspace {
  project: Project;
  papers: Paper[];
  drafts: Draft[];
  stats: WorkspaceStats;
}