import { defineStore } from "pinia";
import type { IInvoice } from "@/types/invoice";
import InvoiceService from "@/services/invoice";

export type RootState = {
  isInvoiceModalShown: boolean;
  isPopupShown: boolean;
  invoicesData: IInvoice[];
  isEditingInvoice: boolean;
};
export const useInvoiceStore = defineStore("invoice", {
  state: () => {
    return {
      isInvoiceModalShown: false,
      isPopupShown: false,
      invoicesData: [],
      isEditingInvoice: false,
    } as RootState;
  },
  getters: {
    getInvoiceById: (state) => {
      return (id: string) =>
        state.invoicesData.find((invoice) => {
          return invoice.docId === id;
        });
    },
  },
  actions: {
    toggleModalShown() {
      this.isInvoiceModalShown = !this.isInvoiceModalShown;
      this.isEditingInvoice = false;
    },
    setEditingInvoice() {
      this.isEditingInvoice = true;
    },
    togglePopupShown() {
      this.isPopupShown = !this.isPopupShown;
    },
    async fetchInvoices() {
      this.invoicesData = await InvoiceService.readInvoices();
    },
    async deleteInvoice(docId: string): Promise<void> {
      await InvoiceService.deleteInvoice(docId);
    },
    async updateStatusToPaid(docId: string) {
      await InvoiceService.updateInvoice(docId, {
        invoicePaid: true,
        invoicePending: false,
      });

      await this.fetchInvoices();
    },
    async updateStatusToPending(docId: string) {
      await InvoiceService.updateInvoice(docId, {
        invoicePaid: false,
        invoicePending: true,
        invoiceDraft: false,
      });

      await this.fetchInvoices();
    },
    async uploadInvoice(invoice: IInvoice) {
      await InvoiceService.createInvoice(invoice);
      this.toggleModalShown();
      this.fetchInvoices();
    },
    async changeInvoice(docId: string, update: IInvoice) {
      await InvoiceService.updateInvoice(docId, update);
      this.toggleModalShown();
      this.fetchInvoices();
    },
  },
});
