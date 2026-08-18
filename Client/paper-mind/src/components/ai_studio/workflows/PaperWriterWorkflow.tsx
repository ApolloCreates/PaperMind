import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import type { StudioPaper } from "@/types/ai_studio";

import {
  GenerateAction
} from "../shared";

import { createDraft } from "@/services/draft.service";
import { useNavigate } from "@tanstack/react-router";
import { useParams } from "@tanstack/react-router";

type Props = {
  selectedPapers: StudioPaper[];
};

export function PaperWriterWorkflow({
  selectedPapers,
}: Props) {
  const [topic, setTopic] = useState("");
  const [instructions, setInstructions] = useState("");
  
  const canRun = topic.trim().length > 0;
const navigate = useNavigate();

const { projectId } = useParams({
  from: "/workspace/$projectId/ai-studio",
});
  const handleGenerate = async () => {
  try {
    const draft = await createDraft({
      project_id: projectId,
      title: topic,
      topic,
      paper_ids: selectedPapers.map((p) => p.id),
      instructions,
    });

    navigate({
      to: "/workspace/$projectId/drafts/$draftId",
      params: {
        projectId,
        draftId: draft.id,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Topic
        </label>

        <Input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. Retrieval-Augmented Generation for Medical Question Answering"
          className="h-10 rounded-lg"
        />

        <label className="mb-1.5 mt-4 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Additional Instructions{" "}
          <span className="font-normal normal-case text-muted-foreground/70">
            (optional)
          </span>
        </label>

        <Textarea
          rows={4}
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="Focus on methodology, experiments, evaluation metrics..."
          className="rounded-lg"
        />

        <div className="mt-3 text-xs text-muted-foreground">
          {selectedPapers.length > 0
            ? `Grounding on ${selectedPapers.length} selected paper${
                selectedPapers.length === 1 ? "" : "s"
              }.`
            : "No papers selected. Draft will be generated only from the topic."}
        </div>
      </div>

      <GenerateAction
        disabled={!canRun}
        label="Generate Draft"
        hint={
          canRun
            ? undefined
            : "Enter a research topic to enable generation."
        }
        onGenerate={handleGenerate}
      />
    </div>
  );
}