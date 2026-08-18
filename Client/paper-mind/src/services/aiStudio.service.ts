import {api} from "@/lib/api";

export interface ChatRequest {
  paper_id: string;
  question: string;
}

export interface ChatResponse {
  answer: string;
}

export async function chat(payload: ChatRequest) {
  const { data } = await api.post<ChatResponse>("/chat", payload);
  return data;
}





export interface SummaryRequest {
  paper_id: string;
}

export interface SummaryResponse {
  summary: string;
}

export async function summary(
  payload: SummaryRequest,
): Promise<SummaryResponse> {
  const { data } = await api.post("/summary", payload);

  return data;
}




export interface LiteratureReviewRequest {
  project_id: string;
  paper_ids: string[];
  topic?: string;
}

export interface LiteratureReviewResponse {
  literature_review: string;
}

export async function literatureReview(
  payload: LiteratureReviewRequest,
): Promise<LiteratureReviewResponse> {

  const { data } = await api.post<LiteratureReviewResponse>(
    "/literature-review",
    payload,
  );

  return data;
}


export interface ResearchGapRequest {
  project_id: string;
  paper_ids: string[];
  topic?: string;
}

export interface ResearchGapResponse {
  gaps: string;
}

export async function researchGap(
  payload: ResearchGapRequest,
): Promise<ResearchGapResponse> {
  const { data } = await api.post<ResearchGapResponse>(
    "/gap-detection",
    payload,
  );

  return data;
}




export interface TopicGenerationRequest {
    project_id: string;
    paper_ids: string[];
    research_area: string;
}

export interface TopicGenerationResponse {
    topics: string;
}

export async function generateTopics(
    payload: TopicGenerationRequest
): Promise<TopicGenerationResponse> {
    const { data } = await api.post<TopicGenerationResponse>(
        "/topic-generation",
        payload
    );

    return data;
}