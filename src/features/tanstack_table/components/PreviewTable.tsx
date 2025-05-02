import { DataTable } from "@/components/ui/data-table"
import type { FilterableColumns, SearchableColumns } from "@/components/ui/data-table-toolbar"
import { SAMPLE_PAYMENT } from "../utils/constants"
import { TableColumn } from "./TableColumn"

const PreviewTable = () => {
  const searchableColumns: SearchableColumns[] = [
    {
      id: "id",
      title: "ID"
    },
    {
      id: "email",
      title: "Email",
    },
  ]

  const filterableColumns: FilterableColumns[] = [
    {
      id: "status",
      title: "Status",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Processing", value: "processing" },
        { label: "Success", value: "success" },
        { label: "Failed", value: "failed" },
      ],
      type: "select",
    },
    {
      id: "createdAt",
      type: "date-range",
    }
  ]

  return (
    <div className="container-wrapper py-8 md:py-10 lg:py-12">
      <div className="container">
        <DataTable
          columns={TableColumn}
          data={SAMPLE_PAYMENT}
          searchableColumns={searchableColumns}
          filterableColumns={filterableColumns}
        />
      </div>
    </div>
  )
}

export default PreviewTable
