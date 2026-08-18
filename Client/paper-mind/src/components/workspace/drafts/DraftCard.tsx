import { FileText, Trash2 } from "lucide-react";
import { Link, useParams } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function DraftCard({
  draft,
}: {
  draft: any;
}) {
  const { projectId } = useParams({
    from: "/workspace/$projectId/drafts",
  });

  return (
    <Card>

      <CardContent className="flex items-center justify-between py-6">

        <div>

          <div className="flex items-center gap-2">

            <FileText className="h-5 w-5" />

            <h3 className="text-lg font-semibold">
              {draft.title}
            </h3>

          </div>

          <p className="mt-2 text-sm text-muted-foreground">
            {draft.topic}
          </p>

        </div>

        <div className="flex gap-2">

          <Button asChild>

            <Link
              to="/workspace/$projectId/drafts/$draftId"
              params={{
                projectId,
                draftId: draft.id,
              }}
            >
              Continue Editing
            </Link>

          </Button>

          <Button
            variant="outline"
            size="icon"
          >
            <Trash2 className="h-4 w-4" />
          </Button>

        </div>

      </CardContent>

    </Card>
  );
}