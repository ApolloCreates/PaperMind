import { useState } from "react";

import { useAIStudio } from "@/hooks/useAIStudio";
import type { StudioPaper } from "@/types/ai_studio";

import {
  GenerateAction,
  GeneratedOutput,
  RequirementNotice,
} from "../shared";

type Props = {
  selectedPapers: StudioPaper[];
};

export function SummaryWorkflow({
  selectedPapers,
}: Props) {
  const [output, setOutput] = useState("");

  const {
    summary,
    loadingSummary,
  } = useAIStudio();

  if (selectedPapers.length !== 1) {
    return (
      <RequirementNotice
        message={
          selectedPapers.length === 0
            ? "Select one paper to generate a summary."
            : "Summary works on exactly one paper."
        }
      />
    );
  }

  const generateSummary = async () => {
    try {
      const response = await summary({
        paper_id: selectedPapers[0].id,
      });

      setOutput(response.summary);
    } catch (err) {
      console.error(err);

      setOutput(
        "Unable to generate summary. Please try again."
      );
    }
  };

  return (
    <div className="space-y-6">
      <GenerateAction
        disabled={loadingSummary}
        onGenerate={generateSummary}
        label={
          loadingSummary
            ? "Generating..."
            : "Generate Summary"
        }
      />

      {output && (
        <GeneratedOutput
          title="Paper Summary"
          body={output}
        />
      )}
    </div>
  );
}