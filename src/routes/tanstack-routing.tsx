import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tanstack-routing')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div className="min-h-screen flex flex-col">
        Hello "/tanstack-routing"!
    </div>
}
