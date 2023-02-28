import type { ILineItem } from "@/types/lineItem";

const create = (data: ILineItem): ILineItem => {
  return { ...data };
};

const calculateLineTotal = (lineItem: ILineItem): number => {
  return lineItem.qty * lineItem.price;
};

export default { create, calculateLineTotal };
