/**
 * expense - interface for expenses
 */
import {Vendor} from '../vendor/vendor';
export interface Product {
  id: string;
  vendor: number;

  // categoryid: string;
  // description: string;
  // receipt: boolean;
  // dateincurred: Date;
  // amount: number;

  name: string;
  costprice: number;
  msrp: number;
  rop: number;
  qoh: number;
  qoo: number;
  eop: number;
  qrcode: string;
  qrcodetxt: string;

  Add: boolean;
}
