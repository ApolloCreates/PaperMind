import { motion } from "framer-motion";
import { ExternalLink, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { StudioSource } from "@/types/ai_studio";

export function SourceCard({ source, index }: { source: StudioSource; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
    >
      <Card className="rounded-xl border-border/60 p-3 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
        <div className="flex items-start gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <FileText className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="line-clamp-2 text-xs font-semibold leading-tight text-foreground">
              {source.paperTitle}
            </p>
            <div className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground">
              <span>Page {source.page}</span>
              <span>·</span>
              <span className="text-emerald-600">
                {Math.round(source.relevance * 100)}% match
              </span>
            </div>
            {source.snippet && (
              <p className="mt-1.5 line-clamp-2 text-[11px] italic text-muted-foreground">
                "{source.snippet}"
              </p>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="mt-1.5 h-7 gap-1 px-2 text-[11px]"
            >
              <ExternalLink className="h-3 w-3" />
              View Source
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
