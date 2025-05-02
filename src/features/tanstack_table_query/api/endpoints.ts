import { BACKEND_API } from "@/utils/endpoints";

// based on your backend, you may or may not need to create endpoints.
// if your backend use a sample endpoints for all methods, doesn't need to create endpoints

export const INVOICE_ENDPOINTS = {
  DEFAULT: `${BACKEND_API}/invoice`,
  // but if your backend use different endpoints for each method, you can create endpoints like this:
  // CREATE: `${BACKEND_API}/invoice/create`,
  // UPDATE: `${BACKEND_API}/invoice/update`,
  // DELETE: `${BACKEND_API}/invoice/delete`,
};
