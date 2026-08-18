import { api } from "@/lib/api";
import type { Workspace } from "@/types/workspace";

export async function getWorkspace(
  projectId: string,
): Promise<Workspace> {

  const { data } = await api.get(
    `/workspace/${projectId}`
  );

  return data;
}