export interface Draft {
  id: string;
  project_id: string;
  title: string;
  topic: string;

  paper_ids: string[];
  instructions?: string;

  created_at: string;
  updated_at: string;
}

export interface DraftSection {
  section: string;
  content: string;
}

export interface DraftDetail extends Draft {
  sections: DraftSection[];
}

export interface FullPaper {
  id: string;
  project_id: string;
  title: string;
  topic: string;
  content: string;
}

export interface CreateDraftRequest {
  project_id: string;
  title: string;
  topic: string;
  paper_ids: string[];
  instructions?: string;
}

export interface UpdatePaperRequest {
  content: string;
}