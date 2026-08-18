import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";

import {
  FolderOpen,
  Sparkles,
  Upload,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import type { Project } from "@/types/project";

export function WorkspaceHeader({
  project,
  onUpload,
}: {
  project: Project;
  onUpload: () => void;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="mb-8 flex flex-col gap-6 rounded-2xl border bg-card p-8"
    >
      <div className="flex items-start justify-between">

        <div>

          <div className="mb-3 flex items-center gap-3">

            <div className="rounded-xl bg-primary/10 p-3">

              <FolderOpen className="h-6 w-6 text-primary" />

            </div>

            <Badge>

              Active

            </Badge>

          </div>

          <h1 className="text-3xl font-bold">

            {project.name}

          </h1>

          <p className="mt-2 max-w-3xl text-muted-foreground">

            {project.description || "No description"}

          </p>

        </div>

        <div className="flex gap-3">
          <Button onClick={onUpload}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Paper
          </Button>

          <Button asChild>
            <Link
              to="/workspace/$projectId/ai-studio"
              params={{ projectId: project.id }}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Open AI Studio
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}