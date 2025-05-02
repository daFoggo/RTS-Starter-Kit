import { toast } from "sonner";
import { SAMPLE_INVOICES } from "../utils/constants";
import type { CreateInvoiceDTO, IInvoice } from "../utils/types";

// simulate a delay for the API call
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  // in real world, you would use the following code to fetch data from an API like this:
  //   getInvoices: async (): Promise<IInvoice[]> => {
  //     const response = await fetch(INVOICE_ENDPOINTS.DEFAULT, {
  //       headers: getRequestHeaders(),
  //     });
  //     return handleResponse(response);
  //   },

  // these api below are just for demo purposes
  getInvoices: async (): Promise<IInvoice[]> => {
    await delay(500);
    return SAMPLE_INVOICES;
  },

  getInvoiceById: async (id: string): Promise<IInvoice> => {
    await delay(500);
    return (
      SAMPLE_INVOICES.find((invoice) => invoice.id === id) || ({} as IInvoice)
    );
  },

  createInvoice: async (payment: CreateInvoiceDTO): Promise<IInvoice> => {
    await delay(800);
    const newPayment: IInvoice = {
      ...payment,
      id: Math.random().toString(36).substring(2, 10),
      createdAt: new Date(),
      amount: 0,
      status: "pending",
      email: "",
    };

    SAMPLE_INVOICES.push(newPayment);
    return newPayment;
  },

  updateInvoice: async (
    id: string,
    payment: Partial<IInvoice>
  ): Promise<IInvoice> => {
    await delay(800);
    const index = SAMPLE_INVOICES.findIndex((invoice) => invoice.id === id);
    if (index !== -1) {
      SAMPLE_INVOICES[index] = { ...SAMPLE_INVOICES[index], ...payment };
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
};
