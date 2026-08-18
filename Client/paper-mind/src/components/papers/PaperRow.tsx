import { FileText } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import type { Paper } from "@/types/paper";

import { PaperActions } from "./PaperActions";

function statusVariant(
  status: string,
): "default" | "secondary" | "destructive" | "outline" {
  switch (status.toLowerCase()) {
    case "ready":
      return "default";

    case "processing":
      return "secondary";

    case "failed":
      return "destructive";

    default:
      return "outline";
  }
}

export function PaperRow({
  paper,
  onView,
  onDelete,
}: {
  paper: Paper;
  onView: () => void;
  onDelete: () => void;
}) {
  return (
    <tr className="border-b transition-colors hover:bg-muted/30">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-2">
            <FileText className="h-5 w-5 text-primary" />
          </div>

          <div>
            <p className="font-medium">
              {paper.title || paper.original_filename}
            </p>

            <p className="text-xs text-muted-foreground">
              {paper.original_filename}
            </p>
          </div>
        </div>
      </td>

      <td className="px-4">
        <Badge variant={statusVariant(paper.status)}>
          {paper.status}
        </Badge>
      </td>

      <td className="px-4">
        {paper.page_count}
      </td>

      <td className="px-4">
        {new Date(
          paper.created_at,
        ).toLocaleDateString()}
      </td>

      <td className="px-4 text-right">
        <PaperActions
          paper={paper}
          onView={onView}
          onDelete={onDelete}
        />
      </td>
    </tr>
  );
}