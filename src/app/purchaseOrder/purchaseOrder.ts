import { PurchaseOrderLineitem } from './purchaseOrderLineitem';
export interface PurchaseOrder {
  id: number;
  vendorid: number;
  total: number;
  items: PurchaseOrderLineitem[];
  podate: string;
}
