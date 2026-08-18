import { useMutation } from "@tanstack/react-query";

import * as aiStudio from "@/services/aiStudio.service";

export function useAIStudio() {
  const chatMutation = useMutation({
    mutationFn: aiStudio.chat,
  });

  const summaryMutation = useMutation({
    mutationFn: aiStudio.summary,
  });

  const literatureReviewMutation = useMutation({
    mutationFn: aiStudio.literatureReview,
  });

  const researchGapMutation = useMutation({
    mutationFn: aiStudio.researchGap,
  });

  const topicGenerationMutation = useMutation({
    mutationFn: aiStudio.generateTopics,
  });

  return {
    chat: chatMutation.mutateAsync,
    summary: summaryMutation.mutateAsync,
    literatureReview: literatureReviewMutation.mutateAsync,
    researchGap: researchGapMutation.mutateAsync,
    generateTopics: topicGenerationMutation.mutateAsync,




    loadingChat: chatMutation.isPending,
    loadingSummary: summaryMutation.isPending,
    loadingLiteratureReview: literatureReviewMutation.isPending,
    loadingResearchGap: researchGapMutation.isPending,
    loadingTopicGeneration:
      topicGenerationMutation.isPending,
  };
}
