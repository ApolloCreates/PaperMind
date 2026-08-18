import { api } from "@/lib/api";

export interface PaperWriterRequest {
  draft_id: string;
  section: string;
  instructions?: string;
}

export interface PaperWriterResponse {
  draft_id: string;
  section: string;
  content: string;
  word_count: number;
}

export async function generatePaperSection(
  payload: PaperWriterRequest,
): Promise<PaperWriterResponse> {
  const { data } = await api.post<PaperWriterResponse>(
    "/paper-writer",
    payload,
  );

  return data;
}