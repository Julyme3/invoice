import { defineStore } from "pinia";

export const useInvoiceStore = defineStore("invoice", {
  state: () => {
    return { isInvoiceModalShown: false, isPopupShown: false };
  },
  actions: {
    toggleModalShown() {
      this.isInvoiceModalShown = !this.isInvoiceModalShown;
    },
    togglePopupShown() {
      this.isPopupShown = !this.isPopupShown;
    },
  },
});
