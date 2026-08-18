import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getProjects,
  createProject,
  deleteProject,
} from "@/services/project.service";

import type {
  CreateProjectInput,
} from "@/types/project";

const KEY = ["projects"] as const;

export function useProjects() {
  return useQuery({
    queryKey: KEY,
    queryFn: getProjects,
  });
}

export function useCreateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateProjectInput) => createProject(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEY });
      qc.invalidateQueries({ queryKey: ["dashboard", "projects"] });
      qc.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
  });
}

export function useDeleteProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteProject(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEY });
      qc.invalidateQueries({ queryKey: ["dashboard", "projects"] });
      qc.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
  });
}
