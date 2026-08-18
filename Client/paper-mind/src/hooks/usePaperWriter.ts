import { useMutation } from "@tanstack/react-query";

import {
  generatePaperSection,
  type PaperWriterRequest,
} from "@/services/paperWriter.service";

export function usePaperWriter() {
  const mutation = useMutation({
    mutationFn: (payload: PaperWriterRequest) =>
      generatePaperSection(payload),
  });

  return {
    generateSection: mutation.mutateAsync,
    isGenerating: mutation.isPending,
    error: mutation.error,
  };
}