import { toast } from "sonner";
import { SAMPLE_INVOICES } from "../utils/constants";
import type { CreateInvoiceDTO, IInvoice } from "../utils/types";
import { delay } from "@/utils/functions";
// simulate a delay for the API call

export const invoiceService = {
  // in real world, you would use the following code to fetch data from an API like this:
  //   getInvoices: async (): Promise<IInvoice[]> => {
  //     const response = await fetch(INVOICE_ENDPOINTS.DEFAULT, {
  //       headers: getRequestHeaders(),
  //     });
  //     return handleResponse(response);
  //   },

  // these api below are just for demo purposes
  getInvoices: async (params: {
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<IInvoice[]> => {
    await delay(500);
    return SAMPLE_INVOICES.filter((invoice) => {
      if (params.status && invoice.status !== params.status) return false;
      if (params.search && !invoice.email.includes(params.search)) return false;
      return true;
    }).slice(
      (params.page || 1) * (params.limit || 10) - (params.limit || 10),
      (params.page || 1) * (params.limit || 10)
    );
  },

  getInvoiceById: async (id: string): Promise<IInvoice> => {
    await delay(500);
    return (
      SAMPLE_INVOICES.find((invoice) => invoice.id === id) || ({} as IInvoice)
    );
  },

  createInvoice: async (invoice: CreateInvoiceDTO): Promise<IInvoice> => {
    await delay(800);
    const newInvoice: IInvoice = {
      ...invoice,
      id: Math.random().toString(36).substring(2, 10),
      createdAt: new Date(),
      amount: 0,
      status: "pending",
      email: "",
    };

    SAMPLE_INVOICES.push(newInvoice);
    return newInvoice;
  },

  updateInvoice: async (
    id: string,
    invoice: Partial<IInvoice>
  ): Promise<IInvoice> => {
    await delay(800);
    const index = SAMPLE_INVOICES.findIndex((invoice) => invoice.id === id);
    if (index !== -1) {
      SAMPLE_INVOICES[index] = { ...SAMPLE_INVOICES[index], ...invoice };
      return SAMPLE_INVOICES[index];
    } else {
      toast.error("Invoice not found");
      return {} as IInvoice;
    }
  },

  deleteInvoice: async (id: string): Promise<void> => {
    await delay(800);
    const index = SAMPLE_INVOICES.findIndex((invoice) => invoice.id === id);
    if (index !== -1) {
      SAMPLE_INVOICES.splice(index, 1);
    } else {
      toast.error("Invoice not found");
    }
  },

  bulkUpdateInvoices: async (
    ids: string[],
    data: Partial<IInvoice>
  ): Promise<IInvoice[]> => {
    await delay(1000);

    const updatedInvoices: IInvoice[] = [];
    const notFoundIds: string[] = [];

    ids.forEach((id) => {
      const index = SAMPLE_INVOICES.findIndex((invoice) => invoice.id === id);
      if (index !== -1) {
        SAMPLE_INVOICES[index] = { ...SAMPLE_INVOICES[index], ...data };
        updatedInvoices.push(SAMPLE_INVOICES[index]);
      } else {
        notFoundIds.push(id);
      }
    });

    if (notFoundIds.length > 0) {
      toast.error(`${notFoundIds.length} invoice(s) not found`);
    }
    
    return updatedInvoices;
  },

  bulkDeleteInvoices: async (ids: string[]): Promise<string[]> => {
    await delay(1000);

    const deletedIds: string[] = [];
    const notFoundIds: string[] = [];

    ids.forEach((id) => {
      const index = SAMPLE_INVOICES.findIndex((invoice) => invoice.id === id);
      if (index !== -1) {
        SAMPLE_INVOICES.splice(index, 1);
        deletedIds.push(id);
      } else {
        notFoundIds.push(id);
      }
    });

    if (notFoundIds.length > 0) {
      toast.error(`${notFoundIds.length} invoice(s) not found`);
    }

    return deletedIds;
  },
};
