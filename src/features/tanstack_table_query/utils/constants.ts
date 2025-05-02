import type { IInvoice } from "./types";
export const SAMPLE_INVOICES: IInvoice[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "john@example.com",
    createdAt: new Date(2025, 1, 15, 9, 30), // Feb 15, 09:30
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "jane@example.com",
    createdAt: new Date(2025, 2, 20, 14, 45), // Mar 20, 14:45
  },
  {
    id: "6a37dd12",
    amount: 200,
    status: "success",
    email: "bob@example.com",
    createdAt: new Date(2025, 3, 10, 8, 0), // Apr 10, 08:00
  },
  {
    id: "f5a21c5e",
    amount: 175,
    status: "failed",
    email: "alice@example.com",
    createdAt: new Date(2025, 3, 25, 16, 15), // Apr 25, 16:15
  },
  {
    id: "9b5c1b2a",
    amount: 300,
    status: "success",
    email: "charlie@example.com",
    createdAt: new Date(2025, 4, 5, 11, 20), // May 5, 11:20
  },
  {
    id: "3d8f7a2e",
    amount: 450,
    status: "processing",
    email: "dave@example.com",
    createdAt: new Date(2025, 4, 15, 13, 10), // May 15, 13:10
  },
  {
    id: "c6e2d8f1",
    amount: 275,
    status: "pending",
    email: "eve@example.com",
    createdAt: new Date(2025, 5, 1, 10, 5), // Jun 1, 10:05
  },
  {
    id: "4a9c3b5d",
    amount: 180,
    status: "success",
    email: "frank@example.com",
    createdAt: new Date(2025, 5, 10, 17, 40), // Jun 10, 17:40
  },
  {
    id: "8e7d6c5b",
    amount: 220,
    status: "failed",
    email: "grace@example.com",
    createdAt: new Date(2025, 6, 1, 7, 50), // Jul 1, 07:50
  },
  {
    id: "2b1a9c8d",
    amount: 375,
    status: "success",
    email: "henry@example.com",
    createdAt: new Date(2025, 6, 15, 15, 0), // Jul 15, 15:00
  },
  {
    id: "5f4e3d2c",
    amount: 150,
    status: "pending",
    email: "saddasdasdas@gmail.com",
    createdAt: new Date(2025, 7, 1, 12, 30), // Aug 1, 12:30
  },
];

export const DIALOG_TITLES = {
  read: "Invoice Details",
  create: "Create Invoice",
  update: "Update Invoice",
  delete: "Delete Invoice",
};

export const DIALOG_DESCRIPTIONS = {
  read: "View the details of this invoice.",
  create: "Create a new invoice.",
  update: "Update the existing invoice.",
  delete: "Are you sure you want to delete this invoice?",
};

export const SUBMIT_BUTTON_TEXTS = {
  read: "View",
  create: "Create",
  update: "Update",
  delete: "Delete",
};
