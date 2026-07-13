"use client"

import { useMutation } from "@tanstack/react-query"

import { queryClient } from "@/lib/query-client"

import ProjectService from "@/services/project.service"

import { toast } from "sonner"

export function useCreateProject() {
  return useMutation({
    mutationFn: ProjectService.create,

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      })

      toast.success(
        "Project created successfully."
      )
    },

    onError() {
      toast.error(
        "Failed to create project."
      )
    },
  })
}