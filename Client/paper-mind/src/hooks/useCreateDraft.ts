import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createDraft } from "@/services/draft.service";

export function useCreateDraft() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDraft,

    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ["drafts", data.project_id],
      });
    },
  });
}