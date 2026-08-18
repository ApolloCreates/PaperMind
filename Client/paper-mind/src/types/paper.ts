export interface Paper {
  updated_at: string | number | Date;
  authors: any;
  id: string;
  project_id: string;

  filename: string;
  original_filename: string;

  title: string | null;

  page_count: number;

  status: string;

  created_at: string;
}