import { motion } from "framer-motion";
import { ArrowRight, Trash2, FileText, PenSquare, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { DashboardProject } from "@/types/dashboard";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { DeleteProjectDialog } from "@/components/projects/DeleteProjectDialog";
function statusVariant(status: string): "default" | "secondary" | "outline" {
  const s = status.toLowerCase();
  if (s === "active" || s === "in_progress") return "default";
  if (s === "completed" || s === "done") return "secondary";
  return "outline";
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return iso;
  }
}

export function ProjectCard({
  project,
  index,
}: {
  project: DashboardProject;
  index: number;
}) {

  const navigate = useNavigate();
  const [deleteOpen, setDeleteOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
    >
      <Card
        className="group flex h-full cursor-pointer flex-col justify-between border-border/60 bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
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
            <h3 className="text-base font-semibold text-foreground line-clamp-1">{project.name}</h3>
            <Badge variant={statusVariant(project.status)} className="shrink-0 capitalize">
              {project.status.replace(/_/g, " ")}
            </Badge>
          </div>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{project.description}</p>

          <div className="mt-5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-foreground">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="mt-2 h-2" />
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5" /> {project.papers} papers
            </span>
            <span className="inline-flex items-center gap-1.5">
              <PenSquare className="h-3.5 w-3.5" /> {project.drafts} drafts
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> {formatDate(project.last_activity)}
            </span>
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
