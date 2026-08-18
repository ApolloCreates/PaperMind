import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FolderPlus, LayoutGrid, List, Search } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import { ProjectsHeader } from "./ProjectsHeader";
import { ProjectGrid, type ViewMode } from "./ProjectGrid";
import { ProjectDialog } from "./ProjectDialog";
import { DeleteProjectDialog } from "./DeleteProjectDialog";
import { ProjectsSkeletonGrid } from "./ProjectSkeleton";
import { useProjects } from "@/hooks/useProjects";
import type { Project } from "@/types/project";

type SortMode = "newest" | "oldest" | "alpha";

export function ProjectsPage() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortMode>("newest");
  const [view, setView] = useState<ViewMode>("grid");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [toDelete, setToDelete] = useState<Project | null>(null);

  const { data, isLoading, isError, error, refetch, isRefetching } = useProjects();

  const filtered = useMemo(() => {
    if (!data) return [];
    const q = query.trim().toLowerCase();
    const list = q
      ? data.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description ?? "").toLowerCase().includes(q),
      )
      : [...data];
    list.sort((a, b) => {
      if (sort === "alpha") return a.name.localeCompare(b.name);
      const ta = new Date(a.created_at).getTime();
      const tb = new Date(b.created_at).getTime();
      return sort === "newest" ? tb - ta : ta - tb;
    });
    return list;
  }, [data, query, sort]);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-64">
        <Topbar />
        <motion.main
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
        >
          <ProjectsHeader onNew={() => setDialogOpen(true)} />

          {/* Search + Filter Bar */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects..."
                className="rounded-xl pl-9"
              />
            </div>
            <div className="flex items-center gap-2">
              <Select value={sort} onValueChange={(v) => setSort(v as SortMode)}>
                <SelectTrigger className="w-[160px] rounded-xl">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="alpha">Alphabetical</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex overflow-hidden rounded-xl border border-border">
                <Button
                  size="icon"
                  variant={view === "grid" ? "secondary" : "ghost"}
                  className="rounded-none"
                  aria-label="Grid view"
                  onClick={() => setView("grid")}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant={view === "list" ? "secondary" : "ghost"}
                  className="rounded-none"
                  aria-label="List view"
                  onClick={() => setView("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <section className="mt-6">
            {isLoading ? (
              <ProjectsSkeletonGrid />
            ) : isError ? (
              <Alert variant="destructive">
                <AlertTitle>Couldn't load projects</AlertTitle>
                <AlertDescription className="flex items-center justify-between gap-4">
                  <span>{(error as Error).message}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => refetch()}
                    disabled={isRefetching}
                  >
                    Retry
                  </Button>
                </AlertDescription>
              </Alert>
            ) : filtered.length === 0 ? (
              <EmptyState
                hasQuery={query.trim().length > 0}
                onCreate={() => setDialogOpen(true)}
              />
            ) : (
              <ProjectGrid projects={filtered} view={view} onDelete={setToDelete} />
            )}
          </section>
        </motion.main>
      </div>

      <ProjectDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      <DeleteProjectDialog
        open={toDelete !== null}
        onOpenChange={(open) => {
          if (!open) setToDelete(null);
        }}
        projectId={toDelete?.id ?? ""}
        projectName={toDelete?.name ?? ""}
      />
    </div>
  );
}

function EmptyState({
  hasQuery,
  onCreate,
}: {
  hasQuery: boolean;
  onCreate: () => void;
}) {
  return (
    <Card className="flex flex-col items-center justify-center rounded-xl border-dashed border-border/70 bg-card/50 p-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <FolderPlus className="h-8 w-8" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-foreground">
        {hasQuery ? "No matching projects" : "No projects found"}
      </h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        {hasQuery
          ? "Try a different search term or clear the filter."
          : "Create your first research project to begin your AI-assisted research journey."}
      </p>
      {!hasQuery && (
        <Button size="lg" className="mt-6 rounded-xl" onClick={onCreate}>
          Create Project
        </Button>
      )}
    </Card>
  );
}
