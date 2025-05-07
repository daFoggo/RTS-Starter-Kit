import { GC_TIME, STALE_TIME } from "@/utils/constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { invoiceService } from "../service/invoiceService";
import type { CreateInvoiceDTO, IInvoiceQueryParams } from "../utils/types";

// keys for query cache
export const invoiceKeys = {
  all: ["invoices"] as const,
  lists: () => [...invoiceKeys.all, "list"] as const,
  list: (filters: IInvoiceQueryParams) =>
    [
      ...invoiceKeys.lists(),
      {
        status: filters.status,
        search: filters.search,
        page: filters.page,
        limit: filters.limit,
      },
    ] as const,
  details: () => [...invoiceKeys.all, "detail"] as const,
  detail: (id: string) => [...invoiceKeys.details(), id] as const,
};

export const useGetInvoices = (params: IInvoiceQueryParams) => {
  const { status, search, page = 1, limit = 10 } = params;

  return useQuery({
    queryKey: invoiceKeys.list(params),
    queryFn: () => invoiceService.getInvoices({ status, search, page, limit }),
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });
};

export const useGetInvoice = (id: string) => {
  return useQuery({
    queryKey: invoiceKeys.detail(id),
    queryFn: () => invoiceService.getInvoiceById(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
};

export const useCreateInvoice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateInvoiceDTO) => invoiceService.createInvoice(data),
    onSuccess: (newInvoice) => {
      // Update the cache with the new invoice data
      queryClient.setQueryData(invoiceKeys.detail(newInvoice.id), newInvoice);

      // Invalidate the list query to ensure it reflects the new data
      queryClient.invalidateQueries({
        queryKey: invoiceKeys.lists(),
      });
    },
  });
};

export const useUpdateInvoice = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<CreateInvoiceDTO>) =>
      invoiceService.updateInvoice(id, data),
    onSuccess: (updatedInvoice) => {
      // Update the cache with the updated invoice data
      queryClient.setQueryData(
        invoiceKeys.detail(updatedInvoice.id),
        updatedInvoice
      );

      // Invalidate the list query to ensure it reflects the new data
      queryClient.invalidateQueries({
        queryKey: invoiceKeys.lists(),
      });
    },
  });
};

export const useDeleteInvoice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => invoiceService.deleteInvoice(id),
    onSuccess: (_, id) => {
      // Remove the deleted invoice from the cache
      queryClient.removeQueries({
        queryKey: invoiceKeys.detail(id),
      });

      // Invalidate the list query to ensure it reflects the new data
      queryClient.invalidateQueries({
        queryKey: invoiceKeys.lists(),
      });
    },
  });
};

export const useBulkUpdateInvoices = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      ids,
      data,
    }: {
      ids: string[];
      data: Partial<CreateInvoiceDTO>;
    }) => invoiceService.bulkUpdateInvoices(ids, data),
    onSuccess: (updatedInvoices) => {
      // Update the cache with the updated invoice data
      updatedInvoices.forEach((invoice) => {
        queryClient.setQueryData(invoiceKeys.detail(invoice.id), invoice);
      });

      // Invalidate the list query to ensure it reflects the new data
      queryClient.invalidateQueries({
        queryKey: invoiceKeys.lists(),
      });
    },
  });
};

export const useBulkDeleteInvoices = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: string[]) => invoiceService.bulkDeleteInvoices(ids),
    onSuccess: (_, ids) => {
      ids.forEach((id) => {
        // Remove the deleted invoice from the cache
        queryClient.removeQueries({
          queryKey: invoiceKeys.detail(id),
        });
      });

      // Invalidate the list query to ensure it reflects the new data
      queryClient.invalidateQueries({
        queryKey: invoiceKeys.lists(),
      });
    },
  });
};
