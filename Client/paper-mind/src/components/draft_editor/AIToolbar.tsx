import { Sparkles, Wand2, ListTree, BookOpen, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const actions = [
  { icon: Sparkles, label: "Continue writing" },
  { icon: Wand2, label: "Improve" },
  { icon: ListTree, label: "Outline" },
  { icon: BookOpen, label: "Cite" },
  { icon: ShieldCheck, label: "Review" },
];

export function AIToolbar() {
  return (
    <div className="sticky bottom-4 z-20 mx-auto flex w-fit items-center gap-1 rounded-full border border-border/60 bg-background/95 p-1.5 shadow-lg backdrop-blur">
      <TooltipProvider>
        {actions.map((a, i) => {
          const Icon = a.icon;
          return (
            <div key={a.label} className="flex items-center">
              {i > 0 && <Separator orientation="vertical" className="mx-0.5 h-5" />}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" variant="ghost" className="h-9 w-9 rounded-full">
                    <Icon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{a.label}</TooltipContent>
              </Tooltip>
            </div>
          );
        })}
      </TooltipProvider>
    </div>
  );
}
