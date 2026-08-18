import { motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Clock, FileText, Folder, PenSquare, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Project } from "@/types/project";
import { useState } from "react";
import { DeleteProjectDialog } from "@/components/projects/DeleteProjectDialog";

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

function statusVariant(status: string): "default" | "secondary" | "outline" {
  const s = status.toLowerCase();
  if (s === "active" || s === "in_progress") return "default";
  if (s === "completed" || s === "done") return "secondary";
  return "outline";
}

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const navigate = useNavigate();
  const status = project.status ?? "active";
  const progress = project.progress ?? 0;
  const papers = project.papers ?? 0;
  const drafts = project.drafts ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
    >
      <Card
        className="group flex h-full cursor-pointer flex-col justify-between rounded-xl border-border/60 bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
        onClick={() =>
          navigate({
            to: "/workspace/$projectId",
            params: {
              projectId: project.id,
            },
          })
        }
      >
        <div>
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Folder className="h-5 w-5" />
              </div>
              <h3 className="line-clamp-1 text-base font-semibold text-foreground">
                {project.name}
              </h3>
            </div>
            <Badge variant={statusVariant(status)} className="shrink-0 capitalize">
              {status.replace(/_/g, " ")}
            </Badge>
          </div>

          <p className="mt-3 line-clamp-2 min-h-[2.5rem] text-sm text-muted-foreground">
            {project.description || "No description provided."}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5" /> {papers} papers
            </span>
            <span className="inline-flex items-center gap-1.5">
              <PenSquare className="h-3.5 w-3.5" /> {drafts} drafts
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> {formatDate(project.updated_at)}
            </span>
          </div>

          <div className="mt-5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-foreground">{progress}%</span>
            </div>
            <Progress value={progress} className="mt-2 h-2" />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-2">
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
            Open Workspace
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="text-muted-foreground hover:text-destructive"
            aria-label="Delete project"
            onClick={(e) => {
              e.stopPropagation();
              setDeleteOpen(true);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </Card>
      <DeleteProjectDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        projectId={project.id}
        projectName={project.name}
      />
    </motion.div>
  );
}
