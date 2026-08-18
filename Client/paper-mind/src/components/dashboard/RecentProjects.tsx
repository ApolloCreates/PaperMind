import { FolderPlus } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProjectCard } from "./ProjectCard";
import { ProjectsSkeleton } from "./DashboardSkeleton";
import { useDashboardProjects } from "@/hooks/useDashboard";

export function RecentProjects() {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useDashboardProjects();

  if (isLoading) return <ProjectsSkeleton />;

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Couldn't load projects</AlertTitle>
        <AlertDescription>{(error as Error).message}</AlertDescription>
      </Alert>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center border-dashed border-border/70 bg-card/50 p-12 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <FolderPlus className="h-7 w-7" />
        </div>
        <h3 className="mt-4 text-base font-semibold text-foreground">No projects yet</h3>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          Create your first research project to organize papers, drafts, and AI reviews.
        </p>
        <Button className="mt-5 rounded-lg">+ New Project</Button>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {data.map((p, i) => (
        <ProjectCard key={p.id} project={p} index={i} />
      ))}
    </div>
  );
}
