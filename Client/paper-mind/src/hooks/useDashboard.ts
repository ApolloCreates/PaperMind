import { useQuery } from "@tanstack/react-query";

import {
  getDashboardProjects,
  getDashboardStats,
} from "@/services/dashboard.service";

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: getDashboardStats,
  });
}

export function useDashboardProjects() {
  return useQuery({
    queryKey: ["dashboard", "projects"],
    queryFn: getDashboardProjects,
  });
}