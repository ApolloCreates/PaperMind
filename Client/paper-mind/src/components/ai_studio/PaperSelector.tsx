import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PaperCard } from "./PaperCard";
import type { StudioPaper } from "@/types/ai_studio";

export function PaperSelector({
  papers,
  selected,
  onChange,
}: {
  papers: StudioPaper[];
  selected: string[];
  onChange: (next: string[]) => void;
}) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return papers;
    return papers.filter(
      (p) => p.title.toLowerCase().includes(t) || p.filename.toLowerCase().includes(t),
    );
  }, [papers, q]);

  const toggle = (id: string) => {
    onChange(selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id]);
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search papers..."
          className="h-9 rounded-lg pl-9"
        />
      </div>
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <p className="rounded-lg border border-dashed border-border/60 p-4 text-center text-xs text-muted-foreground">
            No papers found.
          </p>
        ) : (
          filtered.map((p) => (
            <PaperCard
              key={p.id}
              paper={p}
              selected={selected.includes(p.id)}
              onToggle={() => toggle(p.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
