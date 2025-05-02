import InvoiceTable from '@/features/tanstack_table_query/components/InvoiceTable'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tanstack-table-query')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="min-h-screen flex flex-col">
      <InvoiceTable />
    </div>
  )
}
