import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTable } from "@/components/ui/data-table"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import type { FilterableColumns, SearchableColumns } from "@/components/ui/data-table-toolbar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { ColumnDef } from "@tanstack/react-table"
import { Copy, Eye, MoreHorizontal, Pen, Plus, Trash2 } from "lucide-react"
import { useInvoiceFormDialog } from "../hooks/useInvoiceFormDialog"
import { useInvoices } from "../hooks/useInvoices"
import type { IInvoice } from "../utils/types"
import InvoiceFormDialog from "./InvoiceFormDialog"

const InvoiceTable = () => {
  const { data: invoices = [], isLoading: isLoadingInvoices } = useInvoices({})

  const {
    isOpen,
    setIsOpen,
    formType,
    form,
    isSubmitting,
    onSubmit,
    handleDelete,
    openCreateDialog,
    openUpdateDialog,
    openDeleteDialog,
    invoiceId
  } = useInvoiceFormDialog(

    )

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

  const invoiceColumn: ColumnDef<IInvoice>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
      cell: ({ row }) => {
        const id = row.getValue("id") as string
        return <span className="font-medium">{id}</span>
      },
      enableSorting: false,
    },
    {
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <div className="flex items-center">
            <div
              className={`mr-2 h-2 w-2 rounded-full ${status === "pending"
                ? "bg-yellow-500"
                : status === "processing"
                  ? "bg-blue-500"
                  : status === "success"
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
            />
            <span className="capitalize">{status}</span>
          </div>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    },
    {
      accessorKey: "amount",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
      cell: ({ row }) => {
        const amount = Number.parseFloat(row.getValue("amount"))
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount)

        return <div className="font-medium">{formatted}</div>
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
      cell: ({ row }) => {
        const createdAt = row.getValue("createdAt") as Date
        return <div>{createdAt ? new Date(createdAt).toLocaleDateString(
          "vi-VN",
          {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }
        ) : "N/A"}</div>
      },
      filterFn: (row, id, filterValue) => {
        if (!filterValue) return true;
        const date = row.getValue(id) as Date;
        if (!date) return false;

        const { from, to } = filterValue as { from: Date; to: Date };
        const rowDate = new Date(date);
        return rowDate >= from && rowDate <= to;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const invoice = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="size-8 p-0">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(invoice.id)}>
                <Copy className="size-4 mr-2" /> Copy invoice ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Eye className="size-4 mr-2" />View details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => openUpdateDialog(invoice)}>
                <Pen className="size-4 mr-2" />Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => openDeleteDialog(invoice)}>
                <Trash2 className="size-4 mr-2 text-destructive" />
                <p className="text-destructive hover:text-destructive">Delete</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
    <div className="container-wrapper py-8 md:py-10 lg:py-12">
      <div className="container">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Invoices</h1>
          <Button onClick={openCreateDialog}>
            <Plus className="mr-2 size-4" /> New Invoice
          </Button>
        </div>

        <DataTable
          columns={invoiceColumn}
          data={invoices}
          searchableColumns={searchableColumns}
          filterableColumns={filterableColumns}
          isLoading={isLoadingInvoices}
        />

        <InvoiceFormDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          formType={formType}
          form={form}
          isSubmitting={isSubmitting}
          isLoading={false}
          onSubmit={onSubmit}
          handleDelete={handleDelete}
          invoiceId={invoiceId || ""}
        />
      </div>
    </div>
  )
}

export default InvoiceTable