import { GC_TIME, STALE_TIME } from "@/utils/constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/api";
import type { CreateInvoiceDTO, IInvoiceQueryParams } from "../utils/types";

// keys for query cache
export const invoiceKeys = {
  all: ["invoices"] as const,
  lists: () => [...invoiceKeys.all, "list"] as const,
  list: (filters: IInvoiceQueryParams) => 
    [...invoiceKeys.lists(), { 
      status: filters.status, 
      search: filters.search,
      page: filters.page,
      limit: filters.limit 
    }] as const,
  details: () => [...invoiceKeys.all, "detail"] as const,
  detail: (id: string) => [...invoiceKeys.details(), id] as const,
};

export const useInvoices = (params: IInvoiceQueryParams) => {
  const { status, search, page = 1, limit = 10 } = params;
  
  return useQuery({
    queryKey: invoiceKeys.list(params),
    queryFn: () => api.getInvoices({ status, search, page, limit }),
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });
};

export const useInvoice = (id: string) => {
  return useQuery({
    queryKey: invoiceKeys.detail(id),
    queryFn: () => api.getInvoiceById(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
};

export const useCreateInvoice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateInvoiceDTO) => api.createInvoice(data),
    onSuccess: (newInvoice) => {
      // Update the cache with the new invoice data
      queryClient.setQueryData(invoiceKeys.detail(newInvoice.id), newInvoice);

      // Invalidate the list query to ensure it reflects the new data
      queryClient.invalidateQueries({
        queryKey: invoiceKeys.lists(),
        refetchType: 'none', 
      });
    },
  });
};

export const useUpdateInvoice = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<CreateInvoiceDTO>) =>
      api.updateInvoice(id, data),
    onSuccess: (updatedInvoice) => {
      // Update the cache with the updated invoice data
      queryClient.setQueryData(
        invoiceKeys.detail(updatedInvoice.id),
        updatedInvoice
      );

      // Invalidate the list query to ensure it reflects the new data
      queryClient.invalidateQueries({
        queryKey: invoiceKeys.lists(),
        refetchType: 'none',
      });
    },
  });
};

export const useDeleteInvoice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.deleteInvoice(id),
    onSuccess: (_, id) => {
      // Remove the deleted invoice from the cache
      queryClient.removeQueries({
        queryKey: invoiceKeys.detail(id),
      });

      // Invalidate the list query to ensure it reflects the new data
      queryClient.invalidateQueries({
        queryKey: invoiceKeys.lists(),
        refetchType: 'none',
      });
    },
  });
};