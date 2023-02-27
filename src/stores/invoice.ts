import { defineStore } from "pinia";
import db from "@/firebase/init";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

export const useInvoiceStore = defineStore("invoice", {
  state: () => {
    return {
      isInvoiceModalShown: false,
      isPopupShown: false,
      invoicesData: [],
      isEditingInvoice: false,
    };
  },
  getters: {
    getInvoiceById: (state) => {
      return (id: string) =>
        state.invoicesData.find((invoice) => {
          return invoice.invoiceId === id;
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
      const results = await getDocs(collection(db, "invoices"));
      const process = [];
      // TODO add typed api
      results.forEach((doc) => {
        const data = {
          docId: doc.id,
          invoiceId: doc.data().invoiceId,
          billerStreetAddress: doc.data().billerStreetAddress,
          billerCity: doc.data().billerCity,
          billerZipCode: doc.data().billerZipCode,
          billerCountry: doc.data().billerCountry,
          clientName: doc.data().clientName,
          clientEmail: doc.data().clientEmail,
          clientStreetAddress: doc.data().clientStreetAddress,
          clientCity: doc.data().clientCity,
          clientZipCode: doc.data().clientZipCode,
          clientCountry: doc.data().clientCountry,
          invoiceDateUnix: doc.data().invoiceDateUnix,
          invoiceDate: doc.data().invoiceDate,
          paymentTerms: doc.data().paymentTerms,
          paymentDueDateUnix: doc.data().paymentDueDateUnix,
          paymentDueDate: doc.data().paymentDueDate,
          productDescription: doc.data().productDescription,
          invoiceItemList: doc.data().invoiceItemList,
          invoiceTotal: doc.data().invoiceTotal,
          invoicePending: doc.data().invoicePending,
          invoiceDraft: doc.data().invoiceDraft,
          invoicePaid: doc.data().invoicePaid,
        };
        process.push(data);
      });
      this.invoicesData = [...process];
    },
    async deleteInvoice(docId: string) {
      const docRef = doc(db, "invoices", docId);
      await deleteDoc(docRef);
    },
  },
});
