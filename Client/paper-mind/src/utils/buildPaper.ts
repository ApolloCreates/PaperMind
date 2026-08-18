import { SECTIONS } from "@/components/draft_editor/sections";
import type { SectionKey } from "@/components/draft_editor/sections";

export function buildPaper(
  content: Record<SectionKey, string>,
): string {
  return SECTIONS.map((section) => {
    return `## ${section.title}

${content[section.key]}`.trim();
  }).join("\n\n");
}