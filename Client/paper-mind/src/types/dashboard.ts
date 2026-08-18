export interface DashboardStats {
  total_projects: number;
  total_papers: number;
  total_drafts: number;
  total_reviews: number;
}

export interface DashboardProject {
  id: string;
  name: string;
  description: string;
  papers: number;
  drafts: number;
  status: string;
  progress: number;
  last_activity: string;
}