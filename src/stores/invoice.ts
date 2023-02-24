import { defineStore } from "pinia";

export const useInvoiceStore = defineStore("invoice", {
  state: () => {
    return { isInvoiceModalShown: false };
  },
  actions: {
    toggleModalShown() {
      this.isInvoiceModalShown = !this.isInvoiceModalShown;
    },
  },
});
