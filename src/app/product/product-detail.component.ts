import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { Product } from './product';
import { Vendor } from '../vendor/vendor';


import { ValidatorId } from '../validators/id.Validator';
import {composeAsyncValidators} from '@angular/forms/src/directives/shared';
import {MatDialogConfig, MatDialog} from '@angular/material';
import {DeleteDialogComponent} from '../deletedialog/delete-dialog.component';

@Component({
  selector: 'app-expense-detail',
  templateUrl: 'product-detail.html'
})
export class ProductDetailComponent implements OnInit {
// setter


  @Input('expense') set _expense(value: Product) {
    this.selectedExpense =  (<any>Object).assign({}, value);
    this.todoid = this.selectedExpense.id;
  }
  @Input() vendors: Vendor[];
  @Input() products: Product[];
  @Output() cancelled = new EventEmitter();
  @Output() saved = new EventEmitter();
  @Output() deleted = new EventEmitter();

  icon: boolean;



  productexpand: boolean;
  productexpand2: boolean;
  todoid: string;
  expenseForm: FormGroup;
  id: FormControl;
  empid: FormControl;
  // categoryid: FormControl;
  // description: FormControl;
  // amount: FormControl;
  // receipt: FormControl;
  // dateincurred: FormControl;

  name: FormControl;
  costprice: FormControl;
  msrp: FormControl;
  rop: FormControl;
  qoh: FormControl;
  qoo: FormControl;
  eop: FormControl;
  qrcodetxt: FormControl;
  selectedExpense: Product;

  constructor(private builder: FormBuilder, public dialog: MatDialog) {
    this.productexpand = true;
    this.productexpand2 = true;
    this.icon = true;
    this.id = new FormControl('', Validators.compose([this.uniqueCodeValidator.bind(this), Validators.required]));
    this.empid = new FormControl('', Validators.compose([Validators.required]));

    // this.categoryid = new FormControl('', Validators.compose([Validators.required]));
    // this.description = new FormControl('', Validators.compose([Validators.required]));
    // this.amount = new FormControl('', Validators.compose([Validators.required]));
    // this.receipt = new FormControl('', Validators.compose([Validators.required]));
    // this.dateincurred = new FormControl('', Validators.compose([Validators.required]));

    this.name = new FormControl('', Validators.compose([Validators.required]));
    this.costprice = new FormControl('', Validators.compose([Validators.required]));
    this.msrp = new FormControl('', Validators.compose([Validators.required]));

    this.rop = new FormControl('', Validators.compose([Validators.required]));
    this.qoh = new FormControl('', Validators.compose([Validators.required]));
    this.qoo = new FormControl('', Validators.compose([Validators.required]));
    this.eop = new FormControl('', Validators.compose([Validators.required]));
    this.qrcodetxt = new FormControl('', Validators.compose([Validators.required]));
  } // constructor
  ngOnInit() {

    this.expenseForm = this.builder.group({
      id: this.id,
      empid: this.empid,
      // categoryid: this.categoryid,
      // description: this.description,
      // amount: this.amount,
      // receipt: this.receipt,
      // dateincurred: this.dateincurred,
      name: this.name,
      costprice: this.costprice,
      msrp: this.msrp,
      rop: this.rop,
      qoh: this.qoh,
      qoo: this.qoo,
      eop: this.eop,
      qrcodetxt : this.qrcodetxt
    });
// patchValue doesn't care if all values are present

    this.expenseForm.patchValue({
      id: this.selectedExpense.id,
      empid: this.selectedExpense.vendor,
      // categoryid: this.selectedExpense.categoryid,
      // description: this.selectedExpense.description,
      // amount: this.selectedExpense.amount,
      // receipt: this.selectedExpense.receipt,
      // dateincurred: this.selectedExpense.dateincurred,
      name: this.selectedExpense.name,
      costprice: this.selectedExpense.costprice,
      msrp: this.selectedExpense.msrp,
      rop: this.selectedExpense.rop,
      qoh: this.selectedExpense.qoh,
      qoo: this.selectedExpense.qoo,
      eop: this.selectedExpense.eop,
      qrcodetxt: this.selectedExpense.qrcodetxt,
    });
    console.log(this.selectedExpense);
  } // ngOnInit
  updateSelectedExpense() {
    this.selectedExpense.id = this.expenseForm.get('id').value;
    this.selectedExpense.vendor = this.expenseForm.get('empid').value;
    // this.selectedExpense.categoryid = this.expenseForm.get('categoryid').value;
    // this.selectedExpense.description = this.expenseForm.get('description').value;
    // this.selectedExpense.amount = this.expenseForm.get('amount').value;
    // this.selectedExpense.receipt = this.expenseForm.get('receipt').value;
    // this.selectedExpense.dateincurred = this.expenseForm.get('dateincurred').value;
    this.selectedExpense.name = this.expenseForm.get('name').value;

    this.selectedExpense.costprice = this.expenseForm.get('costprice').value;
    this.selectedExpense.msrp =  this.expenseForm.get('msrp').value;
    this.selectedExpense.eop = this.expenseForm.get('eop').value;
    this.selectedExpense.qoh = this.expenseForm.get('qoh').value;
    this.selectedExpense.qoo = this.expenseForm.get('qoo').value;
    this.selectedExpense.rop = this.expenseForm.get('rop').value;
    this.selectedExpense.qrcodetxt = this.expenseForm.get('qrcodetxt').value;

    this.selectedExpense.qrcode = 'ddd';

    if ( !this.todoid ) {
      this.selectedExpense.Add = true;
    } else {
      this.selectedExpense.Add = false;
    }
    this.saved.emit(this.selectedExpense);
  }



  click() {
    this.icon = !this.icon;
  }
  uniqueCodeValidator(control) {
    if (this.products) {
      for (const p of this.products) {
        if (p.id === control.value && !this.todoid) {
          return { idExists: true };
        }
      }
      return  null;
    }
  } // uniqueCodeValidator


  openDeleteModal(selectedEmployee: Vendor) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      title: `Delete ${this.selectedExpense.name}`,
      entityname: 'vendor'
    };
    dialogConfig.panelClass = 'custommodal';
    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleted.emit(this.selectedExpense);
      }
    });
  } // openDeleteModal
} // ExpenseDetailComponent
