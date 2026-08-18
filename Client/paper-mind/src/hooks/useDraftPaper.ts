import { useQuery } from "@tanstack/react-query";

import { getFullPaper } from "@/services/draft.service";

export function useDraftPaper(draftId: string) {
  return useQuery({
    queryKey: ["draft-paper", draftId],
    queryFn: () => getFullPaper(draftId),
    enabled: !!draftId,
  });
}