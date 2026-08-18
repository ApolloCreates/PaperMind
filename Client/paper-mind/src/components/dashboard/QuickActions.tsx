import { motion } from "framer-motion";

import { Folder, BookOpen, Sparkles, Pen, ArrowUpRight, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

type Action = { title: string; description: string; icon: LucideIcon; to: string };

const actions: Action[] = [
  { title: "Upload Research Paper", description: "Add a new paper to your library", icon: Folder, to: "/papers" },
  { title: "Generate Literature Review", description: "AI-powered synthesis", icon: BookOpen, to: "/workspace" },
  { title: "Generate Topics", description: "Discover research directions", icon: Sparkles, to: "/workspace" },
  { title: "Open Draft Editor", description: "Continue writing", icon: Pen, to: "/drafts" },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {actions.map((a, i) => {
        const Icon = a.icon;
        return (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
          >
            <a href={a.to} className="block h-full">
              <Card className="group h-full cursor-pointer border-border/60 bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-foreground">{a.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{a.description}</p>
              </Card>
            </a>
          </motion.div>
        );
      })}
    </div>
  );
}
