import { PenSquare } from "lucide-react";
import { Card } from "@/components/ui/card";

import type { Draft } from "@/types/draft";

export function DraftSection({
  drafts,
}: {
  drafts: Draft[];
}) {

  return (

    <Card className="mt-8 rounded-2xl p-6">

      <h2 className="mb-6 text-xl font-semibold">

        Recent Drafts

      </h2>

      {drafts.length === 0 ? (

        <div className="flex flex-col items-center py-12">

          <PenSquare className="mb-4 h-12 w-12 text-muted-foreground" />

          <p>No drafts yet.</p>

        </div>

      ) : (

        <div className="space-y-3">

          {drafts.slice(0,5).map((draft)=>(

            <div
              key={draft.id}
              className="rounded-xl border p-4"
            >

              <p className="font-medium">

                {draft.title}

              </p>

              <p className="text-sm text-muted-foreground">

                {draft.topic}

              </p>

            </div>

          ))}

        </div>

      )}

    </Card>

  );
}