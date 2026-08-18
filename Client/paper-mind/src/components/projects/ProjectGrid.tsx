import { motion } from "framer-motion";
import { ArrowRight, Clock, FileText, Folder, PenSquare, Trash2 } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/types/project";

export type ViewMode = "grid" | "list";

export function ProjectGrid({
  projects,
  view,
  onDelete,
}: {
  projects: Project[];
  view: ViewMode;
  onDelete: (project: Project) => void;
}) {
  if (view === "list") {
    return (
      <div className="flex flex-col gap-3">
        {projects.map((p, i) => (
          <ProjectRow key={p.id} project={p} index={i} onDelete={onDelete} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((p, i) => (
        <ProjectCard
          key={p.id}
          project={p}
          index={i}
        />
      ))}
    </div>
  );
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function ProjectRow({
  project,
  index,
  onDelete,
}: {
  project: Project;
  index: number;
  onDelete: (p: Project) => void;
}) {
  const navigate = useNavigate();
  const progress = project.progress ?? 0;
  const status = project.status ?? "active";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
    >
      <Card
        className="flex flex-col gap-4 rounded-xl border-border/60 p-4 shadow-sm transition-all hover:shadow-md cursor-pointer md:flex-row md:items-center"
        onClick={() =>
          navigate({
            to: "/workspace/$projectId",
            params: {
              projectId: project.id,
            },
          })
        }
      >
        <div className="flex flex-1 items-center gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Folder className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="truncate text-sm font-semibold text-foreground">{project.name}</h3>
              <Badge variant="outline" className="capitalize">
                {status.replace(/_/g, " ")}
              </Badge>
            </div>
            <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
              {project.description || "No description provided."}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground md:w-auto">
          <span className="inline-flex items-center gap-1.5">
            <FileText className="h-3.5 w-3.5" /> {project.papers ?? 0}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <PenSquare className="h-3.5 w-3.5" /> {project.drafts ?? 0}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" /> {formatDate(project.updated_at)}
          </span>
          <div className="w-32">
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="rounded-lg"
            onClick={(e) => {
              e.stopPropagation();

              navigate({
                to: "/workspace/$projectId",
                params: {
                  projectId: project.id,
                },
              });
            }}
          >
            Open <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="text-muted-foreground hover:text-destructive"
            aria-label="Delete project"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(project);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
