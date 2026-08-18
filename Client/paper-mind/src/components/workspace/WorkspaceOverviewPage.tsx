import { useParams } from "@tanstack/react-router";

import { useWorkspace } from "@/hooks/useWorkspace";

import { WorkspaceStats } from "./WorkspaceStats";
import { WorkspaceSkeleton } from "./WorkspaceSkeleton";
import { PapersSection } from "./PapersSection";
import { DraftSection } from "./DraftSection";
import { QuickActions } from "./QuickActions";

export function WorkspaceOverviewPage() {
  const { projectId } = useParams({
    from: "/workspace/$projectId",
  });

  const {
    data,
    isLoading,
    isError,
    error,
  } = useWorkspace(projectId);

  if (isLoading) {
    return <WorkspaceSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-destructive">
          {(error as Error).message}
        </p>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <WorkspaceStats stats={data.stats} />

      <div className="mt-8 grid grid-cols-1 gap-8 xl:grid-cols-12">
        <div className="space-y-8 xl:col-span-8">
          <PapersSection papers={data.papers} />

          <DraftSection drafts={data.drafts} />
        </div>

        <div className="xl:col-span-4">
          <QuickActions />
        </div>
      </div>
    </>
  );
}