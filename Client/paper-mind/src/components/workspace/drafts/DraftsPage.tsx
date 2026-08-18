import { useState } from "react";
import { Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { DraftCard } from "./DraftCard";
import { EmptyDraftState } from "./EmptyDraftState";
import { CreateDraftDialog } from "./CreateDraftDialog";

import { useParams } from "@tanstack/react-router";

import { useDrafts } from "@/hooks/useDrafts";

export function DraftsPage() {
  const { projectId } = useParams({
    from: "/workspace/$projectId/drafts",
  });

  const {
    data: drafts = [],
    isLoading,
    isError,
  } = useDrafts(projectId);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const filteredDrafts = drafts.filter((draft) =>
    draft.title.toLowerCase().includes(search.toLowerCase())
  );
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        Loading drafts...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center py-20">
        Failed to load drafts.
      </div>
    );
  }
  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Drafts</h1>
          <p className="text-muted-foreground">
            Manage your research paper drafts.
          </p>
        </div>

        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Draft
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

        <Input
          placeholder="Search drafts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {filteredDrafts.length === 0 ? (
        <EmptyDraftState onCreate={() => setOpen(true)} />
      ) : (
        <div className="grid gap-4">
          {filteredDrafts.map((draft) => (
            <DraftCard
              key={draft.id}
              draft={draft}
            />
          ))}
        </div>
      )}

      <CreateDraftDialog
        open={open}
        onOpenChange={setOpen}
        projectId={projectId}
      />

    </div>
  );
}