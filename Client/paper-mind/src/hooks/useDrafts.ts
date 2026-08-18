import { useQuery } from "@tanstack/react-query";

import { getProjectDrafts } from "@/services/draft.service";

export function useDrafts(projectId: string) {
  return useQuery({
    queryKey: ["drafts", projectId],
    queryFn: () => getProjectDrafts(projectId),
    enabled: !!projectId,
  });
}