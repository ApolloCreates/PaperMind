import { FileText, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export function EmptyDraftState({
  onCreate,
}: {
  onCreate: () => void;
}) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed py-20 text-center">

      <FileText className="mb-4 h-14 w-14 text-muted-foreground" />

      <h2 className="text-2xl font-semibold">
        No drafts yet
      </h2>

      <p className="mt-2 max-w-md text-muted-foreground">
        Create your first research paper draft and start writing.
      </p>

      <Button
        className="mt-8"
        onClick={onCreate}
      >
        <Plus className="mr-2 h-4 w-4" />
        Create Draft
      </Button>

    </div>
  );
}