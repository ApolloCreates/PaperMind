import { Outlet, Link, useParams } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import { Button } from "@/components/ui/button";

import { WorkspaceHeader } from "./WorkspaceHeader";
import { WorkspaceTabs } from "./WorkspaceTabs";
import { UploadPaperDialog } from "./UploadPaperDialog";

import { useWorkspace } from "@/hooks/useWorkspace";

import { useState } from "react";

export function WorkspaceLayout() {
  const { projectId } = useParams({
    from: "/workspace/$projectId",
  });

  const { data, isLoading } = useWorkspace(projectId);

  const [uploadOpen, setUploadOpen] = useState(false);

  if (isLoading || !data) return null;

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div className="lg:pl-64">
        <Topbar />

        <main className="mx-auto max-w-7xl px-6 py-8">

          <Button
            asChild
            variant="ghost"
            className="mb-6"
          >
            <Link to="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>

          <WorkspaceHeader
            project={data.project}
            onUpload={() => setUploadOpen(true)}
          />

          <WorkspaceTabs
            projectId={projectId}
          />

          <UploadPaperDialog
            open={uploadOpen}
            onOpenChange={setUploadOpen}
            projectId={projectId}
          />

          <Outlet />

        </main>
      </div>
    </div>
  );
}