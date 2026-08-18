import { useState } from "react";

import { useAIStudio } from "@/hooks/useAIStudio";
import type { StudioPaper } from "@/types/ai_studio";

import {
  GenerateAction,
  GeneratedOutput,
  PromptInput,
  RequirementNotice,
} from "../shared";

type Props = {
  projectId: string;
  selectedPapers: StudioPaper[];
};

export function LiteratureReviewWorkflow({
  projectId,
  selectedPapers,
}: Props) {
  const [topic, setTopic] = useState("");
  const [output, setOutput] = useState("");

  const {
    literatureReview,
    loadingLiteratureReview,
  } = useAIStudio();

  if (selectedPapers.length < 2) {
    return (
      <RequirementNotice
        message="Select at least two papers to generate a literature review."
      />
    );
  }

  const generate = async () => {
    try {
      console.log("projectId:", projectId);

      const payload = {
        project_id: projectId,
        paper_ids: selectedPapers.map((p) => p.id),
        topic: topic || undefined,
      };

      console.log(payload);

      const response = await literatureReview({
        project_id: projectId,
        paper_ids: selectedPapers.map((p) => p.id),
        topic,
      });

      setOutput(response.literature_review);
    } catch (err) {
      console.error(err);

      setOutput(
        "Unable to generate literature review. Please try again.",
      );
    }
  };

  return (
    <div className="space-y-6">
      <PromptInput
        label="Research Topic (Optional)"
        placeholder="e.g. Vision Transformers for Medical Image Segmentation"
        value={topic}
        onChange={setTopic}
      />

      <GenerateAction
        disabled={loadingLiteratureReview}
        onGenerate={generate}
        label={
          loadingLiteratureReview
            ? "Generating..."
            : "Generate Literature Review"
        }
      />

      {output && (
        <GeneratedOutput
          title="Literature Review"
          body={output}
        />
      )}
    </div>
  );
}