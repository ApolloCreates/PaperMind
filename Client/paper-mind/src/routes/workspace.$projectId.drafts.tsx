import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/workspace/$projectId/drafts"
)({
  component: Outlet,
});