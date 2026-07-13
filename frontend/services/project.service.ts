import api from "@/lib/axios"

import {
  Project,
  CreateProjectRequest,
} from "@/types/project"

class ProjectService {
  async list(): Promise<Project[]> {
    const response = await api.get("/projects")

    return response.data
  }

  async create(
    data: CreateProjectRequest
  ): Promise<Project> {
    const response = await api.post(
      "/projects",
      data
    )

    return response.data
  }

  async delete(id: string) {
    await api.delete(`/projects/${id}`)
  }
}

export default new ProjectService()