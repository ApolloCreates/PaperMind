import { MessageSquareText } from "lucide-react";
import { cn } from "@/lib/utils";
import type { StudioSession } from "@/types/ai_studio";

export function SessionHistory({
  sessions,
  onSelect,
}: {
  sessions: StudioSession[];
  onSelect?: (id: string) => void;
}) {
  return (
    <div className="space-y-1">
      {sessions.map((s) => (
        <button
          key={s.id}
          type="button"
          onClick={() => onSelect?.(s.id)}
          className={cn(
            "group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-muted",
            s.active && "bg-primary/[0.06]",
          )}
        >
          <div className="relative">
            <MessageSquareText className="h-4 w-4 text-muted-foreground" />
            {s.active && (
              <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-emerald-500 ring-2 ring-background" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">{s.title}</p>
            <p className="text-[11px] text-muted-foreground">{s.timestamp}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
