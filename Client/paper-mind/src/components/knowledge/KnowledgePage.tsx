import { useMemo, useState } from "react";
import { useParams } from "@tanstack/react-router";

import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

import { usePapers } from "@/hooks/usePapers";

export function KnowledgePage() {
  const { projectId } = useParams({
    from: "/workspace/$projectId/knowledge",
  });

  const {
    data: papers = [],
    isLoading,
    isError,
  } = usePapers(projectId);

  const [search, setSearch] = useState("");

  const filteredPapers = useMemo(() => {
    return papers.filter((paper) =>
      paper.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [papers, search]);

  if (isLoading) {
    return <div>Loading papers...</div>;
  }

  if (isError) {
    return <div>Failed to load papers.</div>;
  }

  return (
    <div className="grid grid-cols-12 gap-6 py-6">

      <Card className="col-span-4 p-4">

        <Input
          placeholder="Search papers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="mt-4 space-y-2">

          {filteredPapers.map((paper) => (

            <Card
              key={paper.id}
              className="cursor-pointer p-3 hover:bg-muted"
            >
              <h3 className="font-medium">
                {paper.title}
              </h3>

              <p className="text-sm text-muted-foreground">
                {paper.authors}
              </p>

            </Card>

          ))}

        </div>

      </Card>

      <Card className="col-span-8 flex items-center justify-center">

        <div className="text-center">

          <h2 className="text-2xl font-semibold">
            AI Research Assistant
          </h2>

          <p className="mt-2 text-muted-foreground">
            AI chat will be integrated here.
          </p>

        </div>

      </Card>

    </div>
  );
}