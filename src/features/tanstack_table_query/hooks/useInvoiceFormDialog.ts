import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { FormType, IInvoice } from "../utils/types";
import {
  useCreateInvoice,
  useDeleteInvoice,
  useUpdateInvoice,
} from "./useInvoices";

const formSchema = z.object({
  amount: z.number().positive("Amount must be positive"),
  status: z.enum(["pending", "processing", "success", "failed"]),
  email: z.string().email("Please enter a valid email"),
  createdAt: z.date().optional(),
});

export type InvoiceFormValues = z.infer<typeof formSchema>;

export const useInvoiceFormDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formType, setFormType] = useState<FormType>("create");
  const [invoiceId, setInvoiceId] = useState<string | null>(null);
  const [currentInvoice, setCurrentInvoice] = useState<IInvoice | null>(null);

  const createInvoiceMutation = useCreateInvoice();
  const updateInvoiceMutation = useUpdateInvoice(invoiceId || "");
  const deleteInvoiceMutation = useDeleteInvoice();

  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      status: "pending",
      email: "",
      createdAt: undefined,
    },
  });

  useEffect(() => {
    if (!isOpen) {
      form.reset();
      setInvoiceId(null);
      setCurrentInvoice(null);
    }
  }, [isOpen, form]);

  useEffect(() => {
    if (currentInvoice && formType === "update") {
      form.reset({
        amount: parseFloat(currentInvoice.amount.toString()),
        status: currentInvoice.status,
        email: currentInvoice.email,
        createdAt: currentInvoice.createdAt,
      });
    }
  }, [currentInvoice, formType, form]);

  const onSubmit = async (values: InvoiceFormValues) => {
    try {
      if (formType === "create") {
        await createInvoiceMutation.mutateAsync(values);
      } else if (formType === "update" && invoiceId) {
        await updateInvoiceMutation.mutateAsync(values);
      }

      setIsOpen(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDelete = async () => {
    if (invoiceId) {
      try {
        await deleteInvoiceMutation.mutateAsync(invoiceId);
        setIsOpen(false);
      } catch (error) {
        console.error("Error deleting invoice:", error);
      }
    }
  };

  const openDialog = (type: FormType, invoice?: IInvoice) => {
    setFormType(type);

    if (invoice) {
      setInvoiceId(invoice.id);
      setCurrentInvoice(invoice);
    } else {
      form.reset({
        amount: 0,
        status: "pending",
        email: "",
        createdAt: new Date(),
      });
    }

    setIsOpen(true);
  };

  return {
    isOpen,
    setIsOpen,
    formType,
    form,
    invoiceId,
    isSubmitting:
      createInvoiceMutation.isPending ||
      updateInvoiceMutation.isPending ||
      deleteInvoiceMutation.isPending,
    onSubmit: form.handleSubmit(onSubmit),
    handleDelete,
    openDialog,
  };
};
