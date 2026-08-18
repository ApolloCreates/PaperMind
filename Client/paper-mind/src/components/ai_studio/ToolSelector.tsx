import { ToolCard } from "./ToolCard";
import { studioTools } from "@/components/ai_studio/data";

export function ToolSelector({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="space-y-2">
      {studioTools.map((t, i) => (
        <ToolCard
          key={t.id}
          tool={t}
          selected={selectedId === t.id}
          onSelect={() => onSelect(t.id)}
          index={i}
        />
      ))}
    </div>
  );
}
