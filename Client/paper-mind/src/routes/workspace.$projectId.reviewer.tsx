import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/workspace/$projectId/reviewer')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/workspace/$projectId/reviewer"!</div>
}
