export interface IInvoice {
  id: string;
  amount: number;
  status: StatusType;
  email: string;
  createdAt?: Date;
}

export interface IInvoiceQueryParams {
  page?: number;
  limit?: number;
  status?: StatusType;
  search?: string;
}

export interface IInvoiceFormDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  form: any;
  formType: FormType;
  invoiceId: string;
  isSubmitting: boolean;
  isLoading: boolean;
  onSubmit: (data: CreateInvoiceDTO | IUpdateInvoiceDTO) => void;
  handleDelete: () => void;
}

export interface IInvoiceActionBarProps {
  table: Table<IInvoice>
  statusOptions: Array<{ label: string; value: string }>
}

export type StatusType = "pending" | "processing" | "success" | "failed";

// you will have to make a different DTO if backend use different names for the fields
export type CreateInvoiceDTO = Omit<IPayment, "id" | "createdAt">;
export type UpdateInvoiceDTO = Partial<CreateInvoiceDTO>;

export type FormType = "read" | "create" | "update" | "delete";
