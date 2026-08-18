import { api } from "@/lib/api";

import {
    CreateProjectInput,
    Project,
} from "@/types/project";

export async function getProjects() {

    const { data } =
        await api.get<Project[]>(
            "/projects"
        );

    return data;
}

export async function createProject(
    input: CreateProjectInput,
) {

    const { data } =
        await api.post<Project>(
            "/projects",
            input,
        );

    return data;
}

export async function deleteProject(
    id: string,
) {

    await api.delete(
        `/projects/${id}`,
    );
}