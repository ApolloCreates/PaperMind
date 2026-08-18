import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { SuggestionCard } from "./SuggestionCard";
import { suggestionPrompts } from "@/components/ai_studio/data";

export function EmptyChatState({ onPick }: { onPick: (text: string) => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative mb-6"
      >
        <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 blur-2xl" />
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-xl">
          <Sparkles className="h-9 w-9" />
        </div>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
      >
        What would you like to research today?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mt-2 max-w-md text-sm text-muted-foreground"
      >
        Choose a starter below or ask your own question grounded in your uploaded papers.
      </motion.p>

      <div className="mt-8 grid w-full max-w-2xl grid-cols-1 gap-2 sm:grid-cols-2">
        {suggestionPrompts.map((p, i) => (
          <SuggestionCard key={p} text={p} index={i} onClick={() => onPick(p)} />
        ))}
      </div>
    </div>
  );
}
