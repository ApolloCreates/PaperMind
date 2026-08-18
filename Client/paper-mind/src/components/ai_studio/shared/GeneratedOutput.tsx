import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

type Props = {
  title: string;
  body: string;
};

export function GeneratedOutput({
  title,
  body,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm"
    >
      <div className="mb-3 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold">
          {title}
        </h3>
      </div>

      <div className="whitespace-pre-wrap text-sm leading-relaxed">
        {body}
      </div>
    </motion.div>
  );
}