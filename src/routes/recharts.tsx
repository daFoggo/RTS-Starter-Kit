import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/recharts')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='min-h-screen flex flex-col'>Hello "/recharts"!</div>
}
