"use client"

import { useMutation } from "@tanstack/react-query"

import { queryClient } from "@/lib/query-client"

import ProjectService from "@/services/project.service"

import { toast } from "sonner"

export function useDeleteProject() {
  return useMutation({
    mutationFn: ProjectService.delete,

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      })

      toast.success(
        "Project deleted."
      )
    },

    onError() {
      toast.error(
        "Failed to delete project."
      )
    },
  })
}