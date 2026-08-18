import { api } from "@/lib/api";
import {
  DashboardProject,
  DashboardStats,
} from "@/types/dashboard";

export async function getDashboardStats(): Promise<DashboardStats> {
  const { data } = await api.get<DashboardStats>("/dashboard/stats");
  return data;
}

export async function getDashboardProjects(): Promise<DashboardProject[]> {
  const { data } = await api.get<{
    projects: DashboardProject[];
  }>("/dashboard/projects");

  return data.projects;
}