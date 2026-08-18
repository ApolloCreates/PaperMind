import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/workspace/$projectId/editor')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/workspace/$projectId/editor"!</div>
}
