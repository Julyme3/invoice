import type { IInvoice } from "@/types/invoice";
import type { ILineItem } from "@/types/lineItem";
import LineItem from "@/modules/lineItem/lineItem";

const setLineItems = (
  invoice: IInvoice,
  invoiceItemList: ILineItem[]
): IInvoice => {
  const updatedInvoice = {
    ...invoice,
    invoiceItemList,
  };
  return {
    ...updatedInvoice,
  };
};

const calculateTotal = (invoice: IInvoice): number => {
  return invoice.invoiceItemList
    .map(LineItem.calculateLineTotal)
    .reduce((acc, curr) => {
      return (acc += curr);
    }, 0);
};

const create = (invoice: IInvoice): IInvoice => {
  return { ...invoice, invoiceTotal: calculateTotal(invoice) };
};

const addLineItem = (invoice: IInvoice, lineItem: ILineItem): IInvoice => {
  const lineItems = [...invoice.invoiceItemList, lineItem];
  return setLineItems(invoice, lineItems);
};

const removeLineItem = (invoice: IInvoice, index: number): IInvoice => {
  const filteredLineItems = invoice.invoiceItemList.filter(
    (item, i) => i !== index
  );
  return setLineItems(invoice, filteredLineItems);
};

const changeLineItem = (
  invoice: IInvoice,
  index: number,
  updatedLineItem: ILineItem
): IInvoice => {
  const lineItems = invoice.invoiceItemList.map((item, i) => {
    return i === index ? updatedLineItem : item;
  });
  return setLineItems(invoice, lineItems);
};

const changeInvoice = (
  invoice: IInvoice,
  update: Partial<IInvoice>
): IInvoice => {
  const updated = {
    ...invoice,
    ...update,
  };
  return { ...updated, invoiceTotal: calculateTotal(updated) };
};

const convertDate = (
  dateUnix: number,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  }
) => {
  return new Date(dateUnix).toLocaleDateString("en-us", options);
};

export default {
  create,
  addLineItem,
  removeLineItem,
  changeLineItem,
  changeInvoice,
  convertDate,
};
