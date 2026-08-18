import { useQuery } from "@tanstack/react-query";

import { getWorkspace } from "@/services/workspace.service";

export function useWorkspace(projectId: string) {
  return useQuery({
    queryKey: ["workspace", projectId],
    queryFn: () => getWorkspace(projectId),
  });
}