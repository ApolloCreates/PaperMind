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

export function TopicGenerationWorkflow({
  projectId,
  selectedPapers,
}: Props) {
  const [topic, setTopic] = useState("");
  const [output, setOutput] = useState("");

  const {
    generateTopics,
    loadingTopicGeneration,
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

      const response = await generateTopics({
        project_id: projectId,
        paper_ids: selectedPapers.map((p) => p.id),
        research_area: topic,
      });

      setOutput(response.topics);
    } catch (err) {
      console.error(err);

      setOutput(
        "Unable to generate generated topics. Please try again.",
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
        disabled={loadingTopicGeneration}
        onGenerate={generate}
        label={
          loadingTopicGeneration
            ? "Generating..."
            : "Generate Generated Topics"
        }
      />

      {output && (
        <GeneratedOutput
          title="Generated Topics"
          body={output}
        />
      )}
    </div>
  );
}