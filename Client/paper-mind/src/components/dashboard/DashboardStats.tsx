import { motion } from "framer-motion";
import { Folder, FileText, PenSquare, Bot, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboardStats } from "@/hooks/useDashboard";
import type { DashboardStats as Stats } from "@/types/dashboard";

type Item = { key: keyof Stats; label: string; subtitle: string; icon: LucideIcon };

const items: Item[] = [
  { key: "total_projects", label: "Projects", subtitle: "Active workspaces", icon: Folder },
  { key: "total_papers", label: "Research Papers", subtitle: "Indexed documents", icon: FileText },
  { key: "total_drafts", label: "Drafts", subtitle: "In progress", icon: PenSquare },
  { key: "total_reviews", label: "Reviews", subtitle: "AI-generated", icon: Bot },
];

export function DashboardStats() {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((i) => (
          <Card key={i.key} className="p-6">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="mt-4 h-8 w-16" />
            <Skeleton className="mt-2 h-3 w-32" />
          </Card>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Couldn't load statistics</AlertTitle>
        <AlertDescription>{(error as Error).message}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, idx) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: idx * 0.05 }}
          >
            <Card className="group relative overflow-hidden border-border/60 bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                  <p className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
                    {data?.[item.key] ?? 0}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{item.subtitle}</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
