import type { Payment } from "./types";

export const SAMPLE_PAYMENT: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "john@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "jane@example.com",
  },
  {
    id: "6a37dd12",
    amount: 200,
    status: "success",
    email: "bob@example.com",
  },
  {
    id: "f5a21c5e",
    amount: 175,
    status: "failed",
    email: "alice@example.com",
  },
  {
    id: "9b5c1b2a",
    amount: 300,
    status: "success",
    email: "charlie@example.com",
  },
  {
    id: "3d8f7a2e",
    amount: 450,
    status: "processing",
    email: "dave@example.com",
  },
  {
    id: "c6e2d8f1",
    amount: 275,
    status: "pending",
    email: "eve@example.com",
  },
  {
    id: "4a9c3b5d",
    amount: 180,
    status: "success",
    email: "frank@example.com",
  },
  {
    id: "8e7d6c5b",
    amount: 220,
    status: "failed",
    email: "grace@example.com",
  },
  {
    id: "2b1a9c8d",
    amount: 375,
    status: "success",
    email: "henry@example.com",
  },
  {
    id: "5f4e3d2c",
    amount: 150,
    status: "pending",
    email: "saddasdasdas"
  }
];
