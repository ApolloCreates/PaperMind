import {
  MoreVertical,
  Eye,
  Download,
  Trash2,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import type { Paper } from "@/types/paper";

export function PaperActions({
  paper,
  onView,
  onDelete,
}: {
  paper: Paper;
  onView: () => void;
  onDelete: () => void;
}) {
  const download = () => {
    window.open(
      `${import.meta.env.VITE_API_URL}/papers/${paper.id}/download`,
      "_blank"
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onView}>
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </DropdownMenuItem>

        <DropdownMenuItem onClick={download}>
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </DropdownMenuItem>

        <DropdownMenuItem
          className="text-destructive"
          onClick={onDelete}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}