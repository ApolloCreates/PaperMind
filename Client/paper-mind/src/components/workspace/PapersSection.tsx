import { FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import type { Paper } from "@/types/paper";

export function PapersSection({
  papers,
}: {
  papers: Paper[];
}) {
  return (
    <Card className="mt-8 rounded-2xl p-6">

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-xl font-semibold">
            Recent Papers
          </h2>

          <p className="text-sm text-muted-foreground">
            Papers uploaded to this project.
          </p>
        </div>

        <Button variant="ghost">
          View All
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>

      </div>

      {papers.length === 0 ? (
        <div className="flex flex-col items-center py-12">

          <FileText className="mb-4 h-12 w-12 text-muted-foreground" />

          <p className="font-medium">
            No papers uploaded
          </p>

          <p className="text-sm text-muted-foreground">
            Upload your first paper to begin.
          </p>

        </div>
      ) : (
        <div className="space-y-3">

          {papers.slice(0, 5).map((paper) => (
            <div
              key={paper.id}
              className="flex items-center justify-between rounded-xl border p-4"
            >

              <div>

                <p className="font-medium">

                  {paper.title || paper.original_filename}

                </p>

                <p className="text-sm text-muted-foreground">

                  {paper.status}

                </p>

              </div>

              <span className="text-sm text-muted-foreground">

                {new Date(
                  paper.created_at
                ).toLocaleDateString()}

              </span>

            </div>
          ))}

        </div>
      )}

    </Card>
  );
}