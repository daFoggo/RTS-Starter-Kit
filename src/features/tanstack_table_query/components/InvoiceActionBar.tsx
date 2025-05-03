import {
    DataTableActionBar,
    DataTableActionBarAction,
    DataTableActionBarSelection,
} from "@/components/ui/data-table-action-bar"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { SelectTrigger } from "@radix-ui/react-select"
import { CheckCircle2, Trash2 } from "lucide-react"
import { useInvoiceActionBar } from "../hooks/usInvoiceActionBar"
import type { IInvoiceActionBarProps } from "../utils/types"

const InvoiceActionBar = ({ table, statusOptions }: IInvoiceActionBarProps) => {
    const {
        handleBulkStatusUpdate,
        handleBulkDelete,
        isPendingUpdate,
        isPendingDelete
    } = useInvoiceActionBar(table)

    return (
        <DataTableActionBar table={table}>
            <DataTableActionBarSelection table={table} />
            <Separator
                orientation="vertical"
                className="hidden data-[orientation=vertical]:h-5 sm:block"
            />
            <div className="flex items-center gap-1.5">
                <Select onValueChange={handleBulkStatusUpdate}>
                    <SelectTrigger>
                        <DataTableActionBarAction
                            size="icon"
                            tooltip="Update status"
                            isPending={isPendingUpdate}
                            variant="ghost"
                        >
                            <CheckCircle2 className="size-4" />
                        </DataTableActionBarAction>
                    </SelectTrigger>
                    <SelectContent align="center">
                        <SelectGroup>
                            {statusOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value} className="capitalize">
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <DataTableActionBarAction
                    size="icon"
                    tooltip="Delete invoices"
                    isPending={isPendingDelete}
                    onClick={handleBulkDelete}
                    variant="secondary"
                    className="border-red-200 bg-red-100 hover:bg-red-200 dark:border-red-900 dark:bg-red-900/30 dark:hover:bg-red-900/50"
                >
                    <Trash2 className="size-4 text-red-500 dark:text-red-400" />
                </DataTableActionBarAction>
            </div>
        </DataTableActionBar>
    )
}

export default InvoiceActionBar