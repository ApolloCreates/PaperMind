import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteDraft } from "@/services/draft.service";

export function useDeleteDraft(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDraft,

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["drafts", projectId],
      });
    },
  });
}