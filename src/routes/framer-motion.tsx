import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/framer-motion')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='flex flex-col min-h-screen'>Hello "/framer-motion"!</div>
}
