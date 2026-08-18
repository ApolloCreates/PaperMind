import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateFullPaper } from "@/services/draft.service";

export function useUpdatePaper() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      draftId,
      content,
    }: {
      draftId: string;
      content: string;
    }) =>
      updateFullPaper(draftId, {
        content,
      }),

    onSuccess(_, variables) {
      queryClient.invalidateQueries({
        queryKey: ["draft-paper", variables.draftId],
      });
    },
  });
}