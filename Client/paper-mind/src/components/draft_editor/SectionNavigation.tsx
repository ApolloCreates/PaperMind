import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { SECTIONS, type SectionKey } from "./sections";
import { cn } from "@/lib/utils";

export function SectionNavigation({
  active,
  completion,
  onSelect,
}: {
  active: SectionKey;
  completion: Record<SectionKey, number>;
  onSelect: (key: SectionKey) => void;
}) {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="rounded-lg">
            <Menu className="mr-1.5 h-4 w-4" />
            Sections
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72">
          <div className="mt-6 space-y-0.5">
            {SECTIONS.map((s) => {
              const Icon = s.icon;
              const pct = completion[s.key] ?? 0;
              return (
                <button
                  key={s.key}
                  onClick={() => onSelect(s.key)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm",
                    active === s.key
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="flex-1 font-medium">{s.title}</span>
                  <span className="text-[10px] tabular-nums">{pct}%</span>
                </button>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
