import type {
  StudioPaper,
  StudioTool,
} from "@/types/ai_studio";

import { GeneratedOutput, WorkflowHeader } from "./shared";

import {
  ChatWorkflow,
  SummaryWorkflow,
  PaperWriterWorkflow,
} from "./workflows";
import { LiteratureReviewWorkflow } from "./workflows/LiteratureWorkflow";
import { ResearchGapWorkflow } from "./workflows/GapWorkflow";
import { TopicGenerationWorkflow } from "./workflows/TopicWorkflow";

type Props = {
  tool: StudioTool;
  papers: StudioPaper[];
  selectedPapers: StudioPaper[];
  projectId: string;
};

export function WorkflowView({
  tool,
  papers: _papers,
  selectedPapers,
  projectId,
}: Props) {
  const renderWorkflow = () => {
    switch (tool.id) {
      case "chat":
        return (
          <ChatWorkflow
            selectedPapers={selectedPapers}
          />
        );

      case "summary":
        return (
          <SummaryWorkflow
            selectedPapers={selectedPapers}
          />
        );

      case "literature":
        return (
          <LiteratureReviewWorkflow
            projectId={projectId}
            selectedPapers={selectedPapers}
          />
        );

      case "gap":
        return (
          <ResearchGapWorkflow
            projectId={projectId}
            selectedPapers={selectedPapers}
          />
        );

      case "topics":
    return (
        <TopicGenerationWorkflow
            projectId={projectId}
            selectedPapers={selectedPapers}
        />
    );

      case "reviewer":
        return (
          <div className="text-center py-10 text-muted-foreground">
            Reviewer workflow coming next...
          </div>
        );

      case "writer":
        return (
          <PaperWriterWorkflow
            selectedPapers={selectedPapers}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-6rem)] flex-col rounded-2xl border border-border/60 bg-card/40 shadow-sm backdrop-blur">
      <WorkflowHeader
        tool={tool}
        papers={selectedPapers}
      />

      <div className="flex-1 overflow-y-auto px-6 py-6">
        {renderWorkflow()}
      </div>
    </div>
  );
}