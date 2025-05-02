import { DataTable } from "@/components/ui/data-table"
import { SAMPLE_PAYMENT } from "../utils/constants"
import { TableColumn } from "./TableColumn"

const PreviewTable = () => {

  const searchableColumns = [
    {
      id: "id",
      title: "ID"
    },
    {
      id: "email",
      title: "Email",
    },
  ]

  const filterableColumns = [
    {
      id: "status",
      title: "Status",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Processing", value: "processing" },
        { label: "Success", value: "success" },
        { label: "Failed", value: "failed" },
      ],
    },
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