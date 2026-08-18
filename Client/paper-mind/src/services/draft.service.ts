import { api } from "@/lib/api";

import type {
  CreateDraftRequest,
  Draft,
  DraftDetail,
  FullPaper,
  UpdatePaperRequest,
} from "@/types/draft";

export async function getProjectDrafts(
  projectId: string,
): Promise<Draft[]> {
  const { data } = await api.get<Draft[]>(
    `/drafts/project/${projectId}`,
  );

  return data;
}

export async function createDraft(
  payload: CreateDraftRequest,
): Promise<Draft> {
  const { data } = await api.post<Draft>(
    "/drafts",
    payload,
  );

  return data;
}

export async function getDraft(
  draftId: string,
): Promise<DraftDetail> {
  const { data } = await api.get<DraftDetail>(
    `/drafts/${draftId}`,
  );

  return data;
}

export async function deleteDraft(
  draftId: string,
): Promise<void> {
  await api.delete(`/drafts/${draftId}`);
}

export async function getFullPaper(
  draftId: string,
): Promise<FullPaper> {
  const { data } = await api.get<FullPaper>(
    `/drafts/${draftId}/paper`,
  );

  return data;
}

export async function updateFullPaper(
  draftId: string,
  payload: UpdatePaperRequest,
): Promise<FullPaper> {
  const { data } = await api.put<FullPaper>(
    `/drafts/${draftId}/paper`,
    payload,
  );

  return data;
}