import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Library, Wrench, FolderOpen, History } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PaperSelector } from "./PaperSelector";
import { SessionHistory } from "./SessionHistory";
import { ToolSelector } from "./ToolSelector";
import { WorkflowView } from "./WorkflowView";
import { sampleSessions, studioTools } from "@/components/ai_studio/data";
import { useParams } from "@tanstack/react-router";
import { mapPaperToStudioPaper } from "./mappers";
import { usePapers } from "@/hooks/usePapers";

function TopNav() {
  const goBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      window.history.back();
    } else if (typeof window !== "undefined") {
      window.location.href = "/projects";
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={goBack}
          className="inline-flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Workspace
        </button>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="hidden sm:inline">PaperMind</span>
          <span className="hidden sm:inline">·</span>
          <span>Research Studio</span>
        </div>
      </div>
    </header>
  );
}

export function AIStudioPage() {
  const { projectId } = useParams({
    from: "/workspace/$projectId/ai-studio",
  });

  const {
    data: papers = [],
    isLoading,
    isError,
  } = usePapers(projectId);
  const [selectedPapers, setSelectedPapers] = useState<string[]>([]);
  const [selectedTool, setSelectedTool] = useState<string>(studioTools[0].id);

  const activeTool = studioTools.find((t) => t.id === selectedTool) ?? studioTools[0];

  const studioPapers = papers.map(mapPaperToStudioPaper);
  const activePapers = studioPapers.filter((paper) =>
    selectedPapers.includes(paper.id),
  );
  if (isLoading) {
    return <div>Loading papers...</div>;
  }

  if (isError) {
    return <div>Failed to load papers.</div>;
  }
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <main className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Research Studio
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Run AI-powered research workflows using your uploaded papers.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* LEFT PANEL — Paper Context */}
          <motion.aside
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl border border-border/60 bg-card/60 p-4 shadow-sm backdrop-blur lg:sticky lg:top-20 lg:h-[calc(100vh-7rem)]">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Library className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold">Paper Context</h2>
                  <p className="text-[11px] text-muted-foreground">
                    Choose papers and review sessions
                  </p>
                </div>
              </div>

              <Tabs defaultValue="papers" className="flex h-[calc(100%-3.5rem)] flex-col">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="papers" className="gap-1.5">
                    <FolderOpen className="h-3.5 w-3.5" />
                    Papers
                  </TabsTrigger>
                  <TabsTrigger value="sessions" className="gap-1.5">
                    <History className="h-3.5 w-3.5" />
                    Sessions
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="papers" className="mt-3 flex-1 overflow-hidden">
                  <ScrollArea className="h-full">
                    <div className="pr-3">
                      <PaperSelector
                        papers={studioPapers}
                        selected={selectedPapers}
                        onChange={setSelectedPapers}
                      />
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="sessions" className="mt-3 flex-1 overflow-hidden">
                  <ScrollArea className="h-full">
                    <div className="pr-3">
                      <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                        Recent Sessions
                      </p>
                      <SessionHistory sessions={sampleSessions} />
                      <Separator className="my-4" />
                      <p className="px-1 text-[11px] text-muted-foreground">
                        Sessions capture each workflow run with its papers and output.
                      </p>
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </div>
          </motion.aside>

          {/* CENTER PANEL — Workflow-driven */}
          <motion.section
            key={activeTool.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-6"
          >
            <WorkflowView
              tool={activeTool}
              papers={studioPapers}
              selectedPapers={activePapers}
              projectId={projectId}
            />
          </motion.section>

          {/* RIGHT PANEL — Research Workflows */}
          <motion.aside
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl border border-border/60 bg-card/60 p-4 shadow-sm backdrop-blur lg:sticky lg:top-20 lg:h-[calc(100vh-7rem)]">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Wrench className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold">Research Workflows</h2>
                  <p className="text-[11px] text-muted-foreground">
                    Each maps to a backend endpoint
                  </p>
                </div>
              </div>
              <ScrollArea className="lg:h-[calc(100vh-11rem)]">
                <div className="pr-3">
                  <ToolSelector selectedId={selectedTool} onSelect={setSelectedTool} />
                </div>
              </ScrollArea>
            </div>
          </motion.aside>
        </div>
      </main>
    </div>
  );
}
