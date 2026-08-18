import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/workspace/$projectId/research')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/workspace/$projectId/research"!</div>
}
