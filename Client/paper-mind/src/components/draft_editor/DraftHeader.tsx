import { Link } from "@tanstack/react-router";
import { ArrowLeft, Sparkles, Bot, Download, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SaveIndicator, type SaveStatus } from "./SaveIndicator";

export function DraftHeader({
  projectId,
  title,
  topic,
  status,
  lastSavedAt,
}: {
  projectId: string;
  title: string;
  topic?: string;
  status: SaveStatus;
  lastSavedAt: Date | null;
}) {
  return (
    <div className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1600px] items-center gap-3 px-4 py-3 sm:px-6">
        <Button asChild variant="ghost" size="sm" className="shrink-0">
          <Link to="/workspace/$projectId" params={{ projectId }}>
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            <span className="hidden sm:inline">Workspace</span>
          </Link>
        </Button>

        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-center gap-2">
            <h1 className="truncate text-sm font-semibold text-foreground sm:text-base">
              {title}
            </h1>
            {topic && (
              <Badge
                variant="secondary"
                className="hidden shrink-0 rounded-full font-normal md:inline-flex"
              >
                {topic}
              </Badge>
            )}
          </div>
          <div className="mt-1 flex items-center gap-2">
            <SaveIndicator status={status} lastSavedAt={lastSavedAt} />
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" variant="outline" className="rounded-lg">
                  <Sparkles className="mr-1.5 h-4 w-4 text-blue-600" />
                  <span className="hidden sm:inline">Generate</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>AI drafting (coming soon)</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button size="sm" variant="outline" className="rounded-lg">
            <Bot className="mr-1.5 h-4 w-4" />
            <span className="hidden sm:inline">Review</span>
          </Button>
          <Button size="sm" className="rounded-lg">
            <Download className="mr-1.5 h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost" className="h-9 w-9">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Rename draft</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem>Version history</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
