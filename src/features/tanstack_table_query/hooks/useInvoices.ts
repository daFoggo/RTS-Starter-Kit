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
  // Chỉ lấy các tham số cần thiết cho server-side filtering
  const { status, search, page = 1, limit = 10 } = params;
  
  return useQuery({
    queryKey: invoiceKeys.list(params),
    // Truyền params vào API call để server xử lý filtering và pagination
    queryFn: () => api.getInvoices({ status, search, page, limit }),
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    // Không cần select function vì server đã xử lý filtering và pagination
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
      // set new invoice to cache
      queryClient.setQueryData(invoiceKeys.detail(newInvoice.id), newInvoice);

      // Chỉ invalidate queries liên quan đến lists, không invalidate tất cả
      queryClient.invalidateQueries({
        queryKey: invoiceKeys.lists(),
        // Prevent refetching immediately on all queries
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
      // set updated invoice to cache
      queryClient.setQueryData(
        invoiceKeys.detail(updatedInvoice.id),
        updatedInvoice
      );

      // Chỉ invalidate queries liên quan đến lists, không invalidate tất cả
      queryClient.invalidateQueries({
        queryKey: invoiceKeys.lists(),
        // Prevent refetching immediately on all queries
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
      // remove invoice from cache
      queryClient.removeQueries({
        queryKey: invoiceKeys.detail(id),
      });

      // Chỉ invalidate queries liên quan đến lists
      queryClient.invalidateQueries({
        queryKey: invoiceKeys.lists(),
        // Prevent refetching immediately
        refetchType: 'none',
      });
    },
  });
};