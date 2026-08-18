import { useMemo, useState } from "react";

import { usePapers } from "@/hooks/usePapers";
import type { Paper } from "@/types/paper";

import { Button } from "@/components/ui/button";

import { PaperRow } from "./PaperRow";
import { PaperDetailsSheet } from "./PaperDetailsSheet";
import { DeletePaperDialog } from "./DeletePaperDialog";
import { PaperTableSkeleton } from "./PaperTableSkeleton";

const PAGE_SIZE = 10;

type SortMode = "newest" | "oldest" | "title" | "pages";

export function PaperTable({
  projectId,
  search,
  sort,
}: {
  projectId: string;
  search: string;
  sort: SortMode;
}) {
  const { data, isLoading } = usePapers(projectId);

  const [selectedPaper, setSelectedPaper] =
    useState<Paper | null>(null);

  const [detailsOpen, setDetailsOpen] =
    useState(false);

  const [paperToDelete, setPaperToDelete] =
    useState<Paper | null>(null);

  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!data) return [];

    const q = search.trim().toLowerCase();

    let papers = [...data];

    if (q) {
      papers = papers.filter((paper) => {
        return (
          paper.title?.toLowerCase().includes(q) ||
          paper.original_filename.toLowerCase().includes(q) ||
          paper.authors?.join(", ").toLowerCase().includes(q)
        );
      });
    }

    papers.sort((a, b) => {
      switch (sort) {
        case "title":
          return (a.title || a.original_filename).localeCompare(
            b.title || b.original_filename
          );

        case "pages":
          return b.page_count - a.page_count;

        case "oldest":
          return (
            new Date(a.created_at).getTime() -
            new Date(b.created_at).getTime()
          );

        case "newest":
        default:
          return (
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
          );
      }
    });

    return papers;
  }, [data, search, sort]);

  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / PAGE_SIZE)
  );

  const currentPage = Math.min(page, totalPages);

  const pageData = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  if (isLoading) {
    return <PaperTableSkeleton />;
  }

  if (!filtered.length) {
    return (
      <div className="rounded-2xl border border-dashed p-16 text-center">
        <h3 className="text-lg font-semibold">
          No papers found
        </h3>

        <p className="mt-2 text-sm text-muted-foreground">
          {search
            ? "Try another search term."
            : "Upload your first research paper to begin using AI-powered research features."}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">

        <table className="w-full">

          <thead className="bg-muted/40">

            <tr className="border-b">

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Paper
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold">
                Status
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold">
                Pages
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold">
                Uploaded
              </th>

              <th className="w-16"></th>

            </tr>

          </thead>

          <tbody>

            {pageData.map((paper) => (

              <PaperRow
                key={paper.id}
                paper={paper}
                onView={() => {
                  setSelectedPaper(paper);
                  setDetailsOpen(true);
                }}
                onDelete={() => {
                  setPaperToDelete(paper);
                }}
              />

            ))}

          </tbody>

        </table>

      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">

          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() =>
              setPage((p) => Math.max(1, p - 1))
            }
          >
            Previous
          </Button>

          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() =>
              setPage((p) => Math.min(totalPages, p + 1))
            }
          >
            Next
          </Button>

        </div>
      )}

      <PaperDetailsSheet
        paper={selectedPaper}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />

      <DeletePaperDialog
        paper={paperToDelete}
        onOpenChange={(open) => {
          if (!open) {
            setPaperToDelete(null);
          }
        }}
      />
    </>
  );
}