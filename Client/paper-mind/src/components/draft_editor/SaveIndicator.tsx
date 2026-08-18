import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, CircleDot } from "lucide-react";
import { cn } from "@/lib/utils";

export type SaveStatus = "saving" | "saved" | "unsaved";

export function SaveIndicator({
  status,
  lastSavedAt,
}: {
  status: SaveStatus;
  lastSavedAt?: Date | null;
}) {
  const config = {
    saving: {
      icon: Loader2,
      label: "Saving…",
      classes: "bg-blue-50 text-blue-700 border-blue-200",
      spin: true,
    },
    saved: {
      icon: Check,
      label: "Saved",
      classes: "bg-emerald-50 text-emerald-700 border-emerald-200",
      spin: false,
    },
    unsaved: {
      icon: CircleDot,
      label: "Unsaved changes",
      classes: "bg-amber-50 text-amber-700 border-amber-200",
      spin: false,
    },
  }[status];

  const Icon = config.icon;

  return (
    <div className="flex items-center gap-2">
      <AnimatePresence mode="wait">
        <motion.div
          key={status}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.18 }}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
            config.classes,
          )}
        >
          <Icon className={cn("h-3.5 w-3.5", config.spin && "animate-spin")} />
          {config.label}
        </motion.div>
      </AnimatePresence>
      {status === "saved" && lastSavedAt && (
        <span className="hidden text-xs text-muted-foreground sm:inline">
          Last saved{" "}
          {lastSavedAt.toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      )}
    </div>
  );
}
