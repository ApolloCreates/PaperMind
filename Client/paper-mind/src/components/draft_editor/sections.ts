import {
  FileText,
  BookOpen,
  Library,
  FlaskConical,
  Beaker,
  BarChart3,
  MessagesSquare,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";

export type SectionKey =
  | "abstract"
  | "introduction"
  | "related-work"
  | "methodology"
  | "experiments"
  | "results"
  | "discussion"
  | "conclusion";

export interface SectionDef {
  key: SectionKey;
  title: string;
  icon: LucideIcon;
  placeholder: string;
}

export const SECTIONS: SectionDef[] = [
  {
    key: "abstract",
    title: "Abstract",
    icon: FileText,
    placeholder:
      "Summarize the paper in 150–250 words: motivation, method, key results, and takeaway.",
  },
  {
    key: "introduction",
    title: "Introduction",
    icon: BookOpen,
    placeholder:
      "Frame the problem, its importance, gaps in prior work, and your contributions.",
  },
  {
    key: "related-work",
    title: "Related Work",
    icon: Library,
    placeholder: "Survey relevant literature and position your contribution.",
  },
  {
    key: "methodology",
    title: "Methodology",
    icon: FlaskConical,
    placeholder: "Describe your approach, models, datasets, and assumptions.",
  },
  {
    key: "experiments",
    title: "Experiments",
    icon: Beaker,
    placeholder: "Detail experimental setup, baselines, metrics, and protocol.",
  },
  {
    key: "results",
    title: "Results",
    icon: BarChart3,
    placeholder: "Present results with tables, figures, and analysis.",
  },
  {
    key: "discussion",
    title: "Discussion",
    icon: MessagesSquare,
    placeholder: "Interpret findings, limitations, and implications.",
  },
  {
    key: "conclusion",
    title: "Conclusion",
    icon: CheckCircle2,
    placeholder: "Summarize contributions and outline future work.",
  },
];
