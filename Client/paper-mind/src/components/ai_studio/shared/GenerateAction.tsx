import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  disabled: boolean;
  onGenerate: () => void;
  label: string;
  hint?: string;
};

export function GenerateAction({
  disabled,
  onGenerate,
  label,
  hint,
}: Props) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border/60 bg-card/40 p-8 text-center">
      {hint && (
        <p className="text-sm text-muted-foreground">
          {hint}
        </p>
      )}

      <Button
        size="lg"
        disabled={disabled}
        onClick={onGenerate}
        className="rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md hover:opacity-95"
      >
        <Play className="mr-2 h-4 w-4" />
        {label}
      </Button>
    </div>
  );
}