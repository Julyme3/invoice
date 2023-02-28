import type { ILineItem } from "@/types/lineItem";

export interface IInvoice {
  docId?: string;
  billerStreetAddress: string;
  billerCity: string;
  billerZipCode: string;
  billerCountry: string;
  clientName: string;
  clientEmail: string;
  clientStreetAddress: string;
  clientCity: string;
  clientZipCode: string;
  clientCountry: string;
  invoiceDateUnix: number;
  invoiceDate: null | string;
  paymentTerms: string;
  paymentDueDateUnix: number;
  paymentDueDate: string;
  productDescription: string;
  invoicePending: boolean;
  invoiceDraft: boolean;
  invoiceItemList: ILineItem[];
  invoiceTotal: number;
  invoicePaid: boolean;
}
