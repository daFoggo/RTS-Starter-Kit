import type { Table } from "@tanstack/react-table";
import { useCallback, useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import type { IInvoice } from "../utils/types";
import { useBulkDeleteInvoices, useBulkUpdateInvoices } from "./useInvoices";

export const useInvoiceActionBar = (table: Table<IInvoice>) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const [currentAction, setCurrentAction] = useState<string | null>(null);

  const bulkUpdateMutation = useBulkUpdateInvoices();
  const bulkDeleteMutation = useBulkDeleteInvoices();

  useEffect(() => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const ids = selectedRows.map((row) => row.original.id);
    setSelectedIds(ids);
  }, [table.getFilteredSelectedRowModel().rows.length, table]);

  const getIsActionPending = useCallback(
    (action: string) => isPending && currentAction === action,
    [isPending, currentAction]
  );

  const handleBulkStatusUpdate = useCallback(
    (newStatus: string) => {
      if (selectedIds.length === 0) return;

      setCurrentAction("update-status");
      startTransition(async () => {
        try {
          await bulkUpdateMutation.mutateAsync({
            ids: selectedIds,
            data: { status: newStatus },
          });
          table.toggleAllRowsSelected(false);
          toast.success("Invoices status updated successfully");
        } catch (error) {
          console.error("Error updating invoices status:", error);
        }
      });
    },
    [selectedIds, bulkUpdateMutation, table]
  );

  const handleBulkDelete = useCallback(() => {
    if (selectedIds.length === 0) return;

    setCurrentAction("delete");
    startTransition(async () => {
      try {
        await bulkDeleteMutation.mutateAsync(selectedIds);
        table.toggleAllRowsSelected(false);
        toast.success("Invoices deleted successfully");
      } catch (error) {
        console.error("Error deleting invoices:", error);
      }
    });
  }, [selectedIds, bulkDeleteMutation, table]);

  return {
    selectedIds,
    getIsActionPending,
    handleBulkStatusUpdate,
    handleBulkDelete,
    isPendingUpdate:
      getIsActionPending("update-status") || bulkUpdateMutation.isPending,
    isPendingDelete:
      getIsActionPending("delete") || bulkDeleteMutation.isPending,
  };
};
