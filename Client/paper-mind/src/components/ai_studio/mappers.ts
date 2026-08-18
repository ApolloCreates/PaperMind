import type { Paper } from "@/types/paper";
import type { StudioPaper } from "@/types/ai_studio";

export function mapPaperToStudioPaper(
  paper: Paper,
): StudioPaper {
  return {
    id: paper.id,
    title: paper.title ?? paper.original_filename,
    filename: paper.original_filename,
    pages: paper.page_count,
    status:
      paper.status === "ready" ||
      paper.status === "processing" ||
      paper.status === "failed"
        ? paper.status
        : "processing",
  };
}