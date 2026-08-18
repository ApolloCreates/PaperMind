import { useMemo, useState } from "react";
import { useParams } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

import { UploadPaperDialog } from "@/components/workspace/UploadPaperDialog";

import { PaperToolbar } from "./PaperToolbar";
import { PaperTable } from "./PaperTable";

type SortMode = "newest" | "oldest" | "title" | "pages";

export function PapersPage() {
  const { projectId } = useParams({
    from: "/workspace/$projectId/papers",
  });

  const [uploadOpen, setUploadOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [sort, setSort] =
    useState<SortMode>("newest");

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold tracking-tight">
            Research Papers
          </h1>

          <p className="mt-1 text-muted-foreground">
            Manage all papers uploaded for this project.
          </p>

        </div>

        <Button
          onClick={() => setUploadOpen(true)}
        >
          Upload Paper
        </Button>

      </div>

      <PaperToolbar
        value={search}
        onChange={setSearch}
        sort={sort}
        onSortChange={(value) =>
          setSort(value as SortMode)
        }
      />

      <PaperTable
        projectId={projectId}
        search={search}
        sort={sort}
      />

      <UploadPaperDialog
        open={uploadOpen}
        onOpenChange={setUploadOpen}
        projectId={projectId}
      />

    </div>
  );
}