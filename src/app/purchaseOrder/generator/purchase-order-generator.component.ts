import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Vendor } from '../../vendor/vendor';
import { RestfulService } from '../../restful.service';
import { Product } from '../../product/product';
import { PurchaseOrderLineitem } from '../purchaseOrderLineitem';
import { PurchaseOrder } from '../purchaseOrder';
import { BASEURL, PDFURL } from '../.././constants';

@Component({
  templateUrl: './purchase-order-generator.html'
})
export class PurchaseOrderGeneratorComponent implements OnInit {
// Entity variables
  expenses: Array<Product>; // everybody's expenses
  employees: Array<Vendor>; // all employees
  items: Array<PurchaseOrderLineitem>; // expense items that will be in report
  selectedexpenses: Array<Product>; // expenses that being currently chosen
  employeeexpenses: Array<Product>; // all expenses for a particular employee
  selectedExpense: Product; // the current selected expense
  selectedEmployee: Vendor; // the current selected employee
// Form
  generatorForm: FormGroup;
  employeeid: FormControl;
  expenseid: FormControl;
  qty: FormControl;
// Primitives
  pickedExpense: boolean;
  pickedEmployee: boolean;
  generated: boolean;
  hasExpenses: boolean;
  viewPdf: boolean;

  msg: string;
  total: number;
  reportno: number;
  url: string;
  constructor(private builder: FormBuilder, private restService: RestfulService) {
    this.pickedEmployee = false;
    this.pickedExpense = false;
    this.generated = false;
    this.viewPdf = false;
    this.url = BASEURL + 'pos';
  } // constructor

  onPickQty(): void {
    this.generatorForm.get('qty').valueChanges.subscribe(val => {
      // this.selectedExpense.eop = val;
      // this.selectedexpenses.forEach(exp => this.total += exp.msrp * exp.eop);
      const item: PurchaseOrderLineitem = {id: 0, poid: 0, productid: this.selectedExpense.id, price: this.selectedExpense.costprice, productname: '', qty: val};
      if (this.items.find(it => it.productid === this.selectedExpense.id)) {
        if (val === -1) {
          this.items.find(it => it.productid === this.selectedExpense.id).qty = this.selectedExpense.eop;
        } else {
          this.items.find(it => it.productid === this.selectedExpense.id).qty = val;
        }
      } else { // add entry
        this.items.push(item);

      }
      const tmpItems = this.items.filter(it => it.qty > 0);
      this.items = tmpItems;

      if (this.items.length === 0) {
        this.msg = 'No item';
      } else {
        this.msg = '';
      }

      this.calculateSub();
    });
  }

  onPickEmployee(): void {
    this.generatorForm.get('employeeid').valueChanges.subscribe(val => {
      if(val) {
        this.selectedExpense = null;
        this.selectedEmployee = val;
        this.loadEmployeeExpenses();
        this.pickedExpense = false;
        this.hasExpenses = false;
        this.msg = 'choose Product for Vendor';
        this.pickedEmployee = true;
        this.generated = false;
        this.items = [];
        this.selectedexpenses = [];
      }
    });
  }

  onPickExpense(): void {
    this.generatorForm.get('expenseid').valueChanges.subscribe(val => {
      this.selectedExpense = val;
      const item: PurchaseOrderLineitem = {id: 0, poid: 0, productid: this.selectedExpense.id, price: this.selectedExpense.costprice, productname: '', qty: this.selectedExpense.eop};
      if (this.items.find(it => it.productid === this.selectedExpense.id)) { // ignore entry
      } else { // add entry
        this.items.push(item);
        this.selectedexpenses.push(this.selectedExpense);
      }
      if (this.items.length > 0) {
        this.hasExpenses = true;
      }

      this.calculateSub();
      this.generatorForm.controls['qty'].reset();
      this.msg = 'choose EOQ';

    });
  }
  ngOnInit() {
    this.msg = '';
    this.employeeid = new FormControl('');
    this.expenseid = new FormControl('');
    this.qty = new FormControl('');
    this.generatorForm = this.builder.group({
      expenseid: this.expenseid,
      employeeid: this.employeeid,
      qty: this.qty
    });
    this.onPickEmployee();
    this.onPickExpense();
    this.onPickQty();
    this.msg = 'loading vendor from server...';
    this.restService.load(BASEURL + 'vendors').subscribe(
      vendorPayload => {
        this.employees = vendorPayload;
        this.msg = 'vendors loaded';
        this.msg = 'loading product from server...';
        this.restService.load(BASEURL + 'Product').subscribe(
          expensePayload => {
            this.expenses = expensePayload;
            this.msg = 'server data loaded';
          },
          err => {this.msg += 'Error occurred - proucts not loaded - ' + err.status + ' - ' + err.statusText;
          });
      },
      err => {this.msg += 'Error occurred - vendor not loaded - ' + err.status + ' - ' + err.statusText;
      });
  } // ngOnInit
  loadEmployeeExpenses() {
    this.employeeexpenses = [];
    this.employeeexpenses = this.expenses.filter(ex => ex.vendor === this.selectedEmployee.id); // filter expenses for single employee
  }
  createReport() {
    this.generated = false;
    const report: PurchaseOrder = {id: 0, items: this.items, vendorid: this.selectedExpense.vendor, total: this.total, podate: null};
    this.restService.add(this.url, report).subscribe(
      reportId => {
        if (reportId > 0) { // server returns new report#
          this.msg = 'PO ' + reportId + ' created!';
          this.generated = true;
          this.reportno = reportId;
        } else {
          this.msg = 'PO not created! - server error';
        }
        this.hasExpenses = false;
        this.pickedEmployee = false;
        this.pickedExpense = false;

        this.selectedEmployee = null;
        this.selectedExpense = null;

        this.generatorForm.controls['employeeid'].reset();
        this.selectedexpenses = [];

      },
      err => {
        this.msg = 'Error occurred - PO not created - ' + err.status + ' - ' + err.statusText;
      }
    );
  } // createReport

  /**
   * viewPdf - determine report number and pass to server
   * for PDF generation in a new window
   */
  viewPdfOnClick() {
    window.open(PDFURL + this.reportno, '');
  } // viewPdf

  calculateSub() {

    this.total = 0;
    this.items.forEach( item => {
      this.total += item.qty * item.price;
    });
  }
} // ReportGeneratorComponent
