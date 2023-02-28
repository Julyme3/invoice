import { describe, expect, it } from "vitest";
import Invoice from "@/modules/invoice/invoice";
import LineItem from "@/modules/lineItem/lineItem";

describe("Invoice Module tests", () => {
  it("create function generates an empty invoice", () => {
    const { emptyInvoice } = testData();
    const invoice = Invoice.create(emptyInvoice);
    expect(invoice.invoiceItemList).toStrictEqual([]);
    expect(invoice.invoiceTotal).toBe(0);
  });
  it("addLineItem adds item to invoice and recalculates total", () => {
    const { emptyInvoice } = testData();
    const invoice = Invoice.create(emptyInvoice);
    const lineItem1 = LineItem.create({
      id: "1",
      itemName: "name1",
      qty: 1,
      price: 10,
      total: 10,
    });
    Invoice.addLineItem(invoice, lineItem1);
    expect(invoice.invoiceItemList).toStrictEqual([lineItem1]);
    expect(invoice.invoiceTotal).toBe(10);

    const lineItem2 = LineItem.create({
      id: "2",
      itemName: "name2",
      qty: 1,
      price: 5,
      total: 5,
    });
    Invoice.addLineItem(invoice, lineItem2);
    expect(invoice.invoiceItemList).toStrictEqual([lineItem1, lineItem2]);
    expect(invoice.invoiceTotal).toBe(15);
  });

  it("removeLineItem removes the item and recalculates the total", () => {
    const { emptyInvoice } = testData();
    const invoice = Invoice.create(emptyInvoice);
    const lineItem1 = LineItem.create({
      id: "1",
      itemName: "name1",
      qty: 1,
      price: 10,
      total: 10,
    });
    Invoice.addLineItem(invoice, lineItem1);
    expect(invoice.invoiceTotal).toBe(10);
    Invoice.removeLineItem(invoice, 0);

    expect(invoice.invoiceItemList).toStrictEqual([]);
    expect(invoice.invoiceTotal).toBe(0);
  });

  it("changeLineItem replaces the line item at the given position", () => {
    const { emptyInvoice } = testData();
    const invoice = Invoice.create(emptyInvoice);
    const lineItem1 = LineItem.create({
      id: "1",
      itemName: "name1",
      qty: 1,
      price: 10,
      total: 10,
    });
    const updatedLineItem = LineItem.create({
      id: "1",
      itemName: "name1",
      qty: 1,
      price: 5,
      total: 5,
    });
    Invoice.addLineItem(invoice, lineItem1);
    Invoice.changeLineItem(invoice, 0, updatedLineItem);

    expect(invoice.invoiceItemList).toStrictEqual([updatedLineItem]);
    expect(invoice.invoiceTotal).toBe(5);
  });
});

function testData() {
  const lineItemData = {
    id: "1",
    itemName: "name",
    qty: 1,
    price: 10,
    total: 10,
  };
  const emptyInvoice = {
    billerStreetAddress: "",
    billerCity: "",
    billerZipCode: "",
    billerCountry: "",
    clientName: "",
    clientEmail: "",
    clientStreetAddress: "",
    clientCity: "",
    clientZipCode: "",
    clientCountry: "",
    invoiceDateUnix: 0,
    invoiceDate: null,
    paymentTerms: "30",
    paymentDueDateUnix: 0,
    paymentDueDate: "",
    productDescription: "",
    invoicePending: false,
    invoiceDraft: false,
    invoiceItemList: [],
    invoicePaid: false,
    invoiceTotal: 0,
  };

  return {
    lineItemData,
    emptyInvoice,
  };
}
