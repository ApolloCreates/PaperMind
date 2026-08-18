import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { StudioTool } from "@/types/ai_studio";

export function ToolCard({
  tool,
  selected,
  onSelect,
  index,
}: {
  tool: StudioTool;
  selected: boolean;
  onSelect: () => void;
  index: number;
}) {
  const Icon = tool.icon;
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      whileHover={{ y: -2 }}
      className={cn(
        "group relative w-full overflow-hidden rounded-xl border border-border/60 bg-card p-3.5 text-left shadow-sm transition-all hover:border-primary/40 hover:shadow-md",
        selected &&
          "border-primary/70 bg-primary/[0.06] ring-2 ring-primary/40 shadow-[0_0_0_4px_rgba(59,130,246,0.08)]",
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors",
            selected && "bg-primary text-primary-foreground",
          )}
        >
          <Icon className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="text-sm">{tool.emoji}</span>
            <p className="truncate text-sm font-semibold text-foreground">{tool.title}</p>
          </div>
          <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-muted-foreground">
            {tool.description}
          </p>
          <p className="mt-1.5 inline-flex items-center rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
            Requires: {tool.requiresLabel}
          </p>
        </div>
        {selected && (
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Check className="h-3 w-3" />
          </div>
        )}
      </div>
    </motion.button>
  );
}
