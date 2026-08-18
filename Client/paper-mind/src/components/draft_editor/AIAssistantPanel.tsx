import { motion } from "framer-motion";
import {
  Sparkles,
  Bot,
  Wand2,
  BookOpen,
  ListTree,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const research = [
  { icon: Wand2, label: "Generate outline", hint: "From your topic" },
  { icon: BookOpen, label: "Cite related work", hint: "Find references" },
  { icon: ListTree, label: "Expand section", hint: "Deepen current" },
];

const review = [
  { icon: ShieldCheck, label: "Clarity pass", hint: "Improve flow" },
  { icon: Bot, label: "Peer review", hint: "Simulate reviewer" },
];

export function AIAssistantPanel() {
  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <Card className="rounded-2xl border-border/60 p-5 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Research Assistant
              </h3>
              <p className="text-[11px] text-muted-foreground">
                Draft with grounded AI
              </p>
            </div>
          </div>
          <div className="space-y-1">
            {research.map((a) => {
              const Icon = a.icon;
              return (
                <Button
                  key={a.label}
                  variant="ghost"
                  className="h-auto w-full justify-start gap-3 rounded-lg px-2 py-2"
                >
                  <Icon className="h-4 w-4 text-blue-600" />
                  <span className="flex-1 text-left">
                    <span className="block text-sm font-medium">{a.label}</span>
                    <span className="block text-[11px] text-muted-foreground">
                      {a.hint}
                    </span>
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              );
            })}
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="rounded-2xl border-border/60 p-5 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
              <Bot className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Review Assistant
              </h3>
              <p className="text-[11px] text-muted-foreground">
                Improve rigor & clarity
              </p>
            </div>
          </div>
          <Separator className="mb-2" />
          <div className="space-y-1">
            {review.map((a) => {
              const Icon = a.icon;
              return (
                <Button
                  key={a.label}
                  variant="ghost"
                  className="h-auto w-full justify-start gap-3 rounded-lg px-2 py-2"
                >
                  <Icon className="h-4 w-4 text-emerald-600" />
                  <span className="flex-1 text-left">
                    <span className="block text-sm font-medium">{a.label}</span>
                    <span className="block text-[11px] text-muted-foreground">
                      {a.hint}
                    </span>
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              );
            })}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
