import { motion } from "framer-motion";
import { Clock, Type, ListChecks, Link2 } from "lucide-react";
import { Card } from "@/components/ui/card";

export function PaperStatisticsCard({
  wordCount,
  sectionsCompleted,
  totalSections,
  referenceCount,
}: {
  wordCount: number;
  sectionsCompleted: number;
  totalSections: number;
  referenceCount: number;
}) {
  const minutes = Math.max(1, Math.round(wordCount / 220));

  const stats = [
    { icon: Type, label: "Words", value: wordCount.toLocaleString() },
    { icon: Clock, label: "Read time", value: `${minutes} min` },
    {
      icon: ListChecks,
      label: "Sections",
      value: `${sectionsCompleted}/${totalSections}`,
    },
    { icon: Link2, label: "References", value: referenceCount.toString() },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
    >
      <Card className="rounded-2xl border-border/60 p-5 shadow-sm">
        <h3 className="mb-4 text-sm font-semibold text-foreground">
          Paper Statistics
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="rounded-xl border border-border/60 bg-background p-3"
              >
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <Icon className="h-3.5 w-3.5" />
                  {s.label}
                </div>
                <p className="mt-1 text-lg font-semibold tabular-nums text-foreground">
                  {s.value}
                </p>
              </div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
