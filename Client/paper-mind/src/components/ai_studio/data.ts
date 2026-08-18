import {
  MessageSquare,
  FileText,
  BookOpen,
  Brain,
  Lightbulb,
  PenLine,
  ClipboardCheck,
} from "lucide-react";
import type { StudioPaper, StudioSession, StudioTool } from "@/types/ai_studio";

export const samplePapers: StudioPaper[] = [
  {
    id: "p1",
    title: "Attention Is All You Need",
    filename: "vaswani_2017.pdf",
    pages: 15,
    status: "ready",
  },
  {
    id: "p2",
    title: "BERT: Pre-training of Deep Bidirectional Transformers",
    filename: "devlin_bert.pdf",
    pages: 16,
    status: "ready",
  },
  {
    id: "p3",
    title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP",
    filename: "lewis_rag.pdf",
    pages: 20,
    status: "processing",
  },
  {
    id: "p4",
    title: "Chain-of-Thought Prompting Elicits Reasoning in LLMs",
    filename: "wei_cot.pdf",
    pages: 12,
    status: "ready",
  },
];

export const sampleSessions: StudioSession[] = [
  { id: "s1", title: "Compare transformer architectures", timestamp: "2m ago", active: true, workflow: "Chat with Paper" },
  { id: "s2", title: "RAG literature review", timestamp: "1h ago", workflow: "Literature Review" },
  { id: "s3", title: "Methodology draft — Chapter 3", timestamp: "Yesterday", workflow: "Paper Writer" },
  { id: "s4", title: "Gaps in prompt engineering", timestamp: "2 days ago", workflow: "Research Gap Analysis" },
];

export const studioTools: StudioTool[] = [
  {
    id: "chat",
    emoji: "💬",
    icon: MessageSquare,
    title: "Chat with Paper",
    description: "Ask questions grounded in one selected paper.",
    requires: "one-paper",
    requiresLabel: "1 paper",
  },
  {
    id: "summary",
    emoji: "📄",
    icon: FileText,
    title: "Summarize Paper",
    description: "Generate concise summaries.",
    requires: "one-paper",
    requiresLabel: "1 paper",
  },
  {
    id: "literature",
    emoji: "📚",
    icon: BookOpen,
    title: "Literature Review",
    description: "Generate literature review from selected papers.",
    requires: "multi-paper",
    requiresLabel: "Multiple papers",
  },
  {
    id: "gap",
    emoji: "🧠",
    icon: Brain,
    title: "Research Gap Analysis",
    description: "Identify unexplored research opportunities.",
    requires: "multi-paper",
    requiresLabel: "Multiple papers",
  },
  {
    id: "topics",
    emoji: "💡",
    icon: Lightbulb,
    title: "Topic Generator",
    description: "Suggest novel research ideas.",
    requires: "multi-paper",
    requiresLabel: "Multiple papers",
  },
  {
    id: "writer",
    emoji: "✍",
    icon: PenLine,
    title: "Paper Writer",
    description: "Generate research paper sections.",
    requires: "topic-optional-papers",
    requiresLabel: "Topic + optional papers",
  },
  {
    id: "reviewer",
    emoji: "📝",
    icon: ClipboardCheck,
    title: "Paper Reviewer",
    description: "Review an uploaded paper.",
    requires: "one-paper",
    requiresLabel: "1 paper",
  },
];

export const suggestionPrompts = [
  "Summarize the key contributions of this paper",
  "What are the main limitations discussed?",
  "Explain the methodology in simple terms",
  "Compare this to prior work",
];
