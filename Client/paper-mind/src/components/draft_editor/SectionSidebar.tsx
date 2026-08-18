import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { SECTIONS, type SectionKey } from "./sections";

export function SectionSidebar({
  active,
  completion,
  onSelect,
}: {
  active: SectionKey;
  completion: Record<SectionKey, number>;
  onSelect: (key: SectionKey) => void;
}) {
  const completedCount = Object.values(completion).filter((v) => v >= 100).length;
  const overall = Math.round(
    Object.values(completion).reduce((a, b) => a + b, 0) / SECTIONS.length,
  );

  return (
    <aside className="hidden w-[260px] shrink-0 border-r border-border/60 bg-card/30 lg:block">
      <div className="sticky top-[73px] h-[calc(100vh-73px)]">
        <ScrollArea className="h-full">
          <div className="p-4">
            <div className="mb-4 rounded-xl border border-border/60 bg-background p-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-foreground">Progress</span>
                <span className="text-muted-foreground">
                  {completedCount}/{SECTIONS.length}
                </span>
              </div>
              <Progress value={overall} className="mt-2 h-1.5" />
              <p className="mt-2 text-[11px] text-muted-foreground">
                {overall}% complete
              </p>
            </div>

            <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Sections
            </p>
            <nav className="space-y-0.5">
              {SECTIONS.map((s, i) => {
                const Icon = s.icon;
                const pct = completion[s.key] ?? 0;
                const done = pct >= 100;
                const isActive = active === s.key;
                return (
                  <motion.button
                    key={s.key}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => onSelect(s.key)}
                    className={cn(
                      "group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="flex-1 truncate font-medium">{s.title}</span>
                    {done ? (
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
                        <Check className="h-3 w-3" />
                      </span>
                    ) : (
                      <span
                        className={cn(
                          "shrink-0 text-[10px] tabular-nums",
                          isActive ? "text-primary/70" : "text-muted-foreground/70",
                        )}
                      >
                        {pct}%
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </nav>
          </div>
        </ScrollArea>
      </div>
    </aside>
  );
}
