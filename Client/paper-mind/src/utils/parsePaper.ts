import { SECTIONS } from "@/components/draft_editor/sections";
import type { SectionKey } from "@/components/draft_editor/sections";

type SectionMap = Record<SectionKey, string>;

export function parsePaper(markdown: string): SectionMap {
  const result = {} as SectionMap;

  // Initialize all sections
  SECTIONS.forEach((section) => {
    result[section.key] = "";
  });

  // Extract content between headings
  SECTIONS.forEach((section, index) => {
    const currentHeading = section.title;

    const nextHeading =
      index < SECTIONS.length - 1
        ? SECTIONS[index + 1].title
        : null;

    const regex = nextHeading
      ? new RegExp(
          `##\\s*${currentHeading}\\s*([\\s\\S]*?)##\\s*${nextHeading}`,
          "i"
        )
      : new RegExp(
          `##\\s*${currentHeading}\\s*([\\s\\S]*)`,
          "i"
        );

    const match = markdown.match(regex);

    if (match) {
      result[section.key] = match[1].trim();
    }
  });

  return result;
}