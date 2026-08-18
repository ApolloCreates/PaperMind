import { useMutation, useQueryClient } from "@tanstack/react-query";

import { uploadPaper } from "@/services/paper.service";

export function useUploadPaper(projectId: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (file: File) =>
      uploadPaper(projectId, file),

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["workspace", projectId],
      });

      qc.invalidateQueries({
        queryKey: ["dashboard", "stats"],
      });

      qc.invalidateQueries({
        queryKey: ["dashboard", "projects"],
      });

      qc.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });
}