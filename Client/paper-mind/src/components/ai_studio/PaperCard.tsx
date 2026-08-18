import { FileText, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { StudioPaper } from "@/types/ai_studio";

export function PaperCard({
  paper,
  selected,
  onToggle,
}: {
  paper: StudioPaper;
  selected: boolean;
  onToggle: () => void;
}) {
  const StatusIcon =
    paper.status === "ready"
      ? CheckCircle2
      : paper.status === "processing"
        ? Loader2
        : AlertCircle;
  const statusColor =
    paper.status === "ready"
      ? "text-emerald-600"
      : paper.status === "processing"
        ? "text-blue-600"
        : "text-destructive";

  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "group flex w-full items-start gap-3 rounded-xl border border-border/60 bg-card p-3 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md",
        selected && "border-primary/60 bg-primary/[0.03] ring-1 ring-primary/30",
      )}
    >
      <Checkbox checked={selected} className="mt-0.5" onCheckedChange={onToggle} />
      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 text-sm font-medium leading-tight text-foreground">
          {paper.title}
        </p>
        <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <FileText className="h-3 w-3 shrink-0" />
          <span className="truncate">{paper.filename}</span>
        </div>
        <div className="mt-1.5 flex items-center gap-2 text-[11px]">
          <span className={cn("flex items-center gap-1", statusColor)}>
            <StatusIcon
              className={cn("h-3 w-3", paper.status === "processing" && "animate-spin")}
            />
            <span className="capitalize">{paper.status}</span>
          </span>
          <span className="text-muted-foreground">·</span>
          <span className="text-muted-foreground">{paper.pages} pages</span>
        </div>
      </div>
    </button>
  );
}
