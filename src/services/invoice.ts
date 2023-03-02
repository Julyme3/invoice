import type { IInvoice } from "@/types/invoice";
import db from "@/firebase/init";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const readInvoices = async (): Promise<IInvoice[]> => {
  const results = await getDocs(collection(db, "invoices"));
  const process: IInvoice[] = [];

  results.forEach((doc) => {
    const data: IInvoice = {
      docId: doc.id,
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

  return process;
};

const deleteInvoice = async (docId: string): Promise<void> => {
  const docRef = doc(db, "invoices", docId);
  await deleteDoc(docRef);
};

const updateInvoice = async (
  docId: string,
  updated: Partial<IInvoice>
): Promise<void> => {
  const docRef = doc(db, "invoices", docId);
  await updateDoc(docRef, updated);
};

const createInvoice = async (invoice: IInvoice): Promise<void> => {
  await addDoc(collection(db, "invoices"), invoice);
};

export default {
  createInvoice,
  readInvoices,
  updateInvoice,
  deleteInvoice,
};
