import { api } from "@/lib/api";

import type { Paper } from "@/types/paper";

export async function uploadPaper(
  projectId: string,
  file: File,
): Promise<Paper> {

  const form = new FormData();

  form.append("project_id", projectId);

  form.append("file", file);

  const { data } = await api.post(
    "/papers/upload",
    form,
    {
      headers: {
        "Content-Type":"multipart/form-data"
      }
    }
  );

  return data;
}

export async function getProjectPapers(
  projectId:string,
):Promise<Paper[]>{

    const {data}=await api.get(
        `/papers/project/${projectId}`
    );

    return data;
}

export async function deletePaper(
    id:string,
){

    await api.delete(
        `/papers/${id}`
    );

}

export function downloadPaper(
    id:string,
){

    const baseUrl = api.defaults.baseURL ?? "";

    window.open(
        `${baseUrl}/papers/${id}/download`,
        "_blank",
    );

}