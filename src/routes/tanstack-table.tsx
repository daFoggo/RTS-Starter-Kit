import PreviewTable from '@/features/tanstack_table/components/PreviewTable'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tanstack-table')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="min-h-screen flex flex-col">
      <PreviewTable />
    </div>
  )
}
