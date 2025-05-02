import { GC_TIME, STALE_TIME } from "@/utils/constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/api";
import type { CreateInvoiceDTO, IInvoiceQueryParams } from "../utils/types";

// keys for query cache
export const invoiceKeys = {
  all: ["invoices"] as const,
  lists: () => [...invoiceKeys.all, "list"] as const,
  list: (filters: IInvoiceQueryParams) =>
    [...invoiceKeys.lists(), filters] as const,
  details: () => [...invoiceKeys.all, "detail"] as const,
  detail: (id: string) => [...invoiceKeys.details(), id] as const,
};

export const useInvoices = (params: IInvoiceQueryParams) => {
  return useQuery({
    queryKey: invoiceKeys.list(params),
    queryFn: () => api.getInvoices(),
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    select: (data) => {
      let filteredData = [...data];

      // Filter by status
      if (params.status) {
        filteredData = filteredData.filter(
          (invoice) => invoice.status === params.status
        );
      }

      // Filter by search
      if (params.search) {
        const searchTerm = params.search.toLowerCase();
        filteredData = filteredData.filter((invoice) =>
          invoice.email.toLowerCase().includes(searchTerm)
        );
      }

      // Pagination
      if (params.page !== undefined && params.limit !== undefined) {
        const start = (params.page - 1) * params.limit;
        const end = start + params.limit;
        filteredData = filteredData.slice(start, end);
      }

      return filteredData;
    },
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

      // force refetch data
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
      api.updateInvoice(id, data),
    onSuccess: (updatedInvoice) => {
      // set updated invoice to cache
      queryClient.setQueryData(
        invoiceKeys.detail(updatedInvoice.id),
        updatedInvoice
      );

      // force refetch data
      queryClient.invalidateQueries({
        queryKey: invoiceKeys.lists(),
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

      // force refetch data
      queryClient.invalidateQueries({
        queryKey: invoiceKeys.lists(),
      });
    },
  });
};
