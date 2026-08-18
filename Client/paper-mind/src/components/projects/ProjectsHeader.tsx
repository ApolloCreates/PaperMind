import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProjectsHeader({ onNew }: { onNew: () => void }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Projects
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Create and manage AI-powered research projects.
        </p>
      </div>
      <Button size="lg" className="rounded-xl shadow-sm" onClick={onNew}>
        <Plus className="mr-1.5 h-4 w-4" />
        New Project
      </Button>
    </div>
  );
}
