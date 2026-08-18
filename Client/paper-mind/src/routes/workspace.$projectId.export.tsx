import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/workspace/$projectId/export')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/workspace/$projectId/export"!</div>
}
