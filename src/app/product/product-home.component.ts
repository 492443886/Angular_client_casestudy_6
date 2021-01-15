
import {MatPaginator, PageEvent} from '@angular/material';
import {Component, OnInit, ViewChild} from '@angular/core';
import { Product } from './product';
import { Vendor } from '../vendor/vendor';
import { RestfulService } from '../restful.service';
import { BASEURL } from '../constants';
@Component({
  selector: 'app-expense',
  templateUrl: 'product-home.html'
})
export class ProductHomeComponent implements OnInit {

  totalElements: number;
  currentPage: number;

  expenses: Array<Product>;
  vendors: Array<Product>;
  selectedExpense: Product;
  hideEditForm: boolean;
  msg: string;
  todo: string;
  url: string;
  emptyEmployee: Vendor;

  // get reference to paginator
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private restService: RestfulService) {
    this.hideEditForm = true;
    this.url = BASEURL + 'Product';
    this.emptyEmployee = {id: null, name: '', type: '', phone: '', email: '', province: '', city: '', postalcode: '', address1: ''};
  } // constructor
  ngOnInit() {
    this.msg = 'loading vendors from server...';
    this.restService.load(BASEURL + 'vendors').subscribe(
      payload => {
        this.vendors = payload;
        this.msg = 'vendors loaded';
      },
      err => {this.msg += 'Error occurred - vendors not loaded - ' + err.status + ' - ' + err.statusText;
      });
    this.msg = 'loading expenses from server...';
    // this.restService.load(this.url).subscribe(
    //   payload => {
    //     this.expenses = payload;
    //     console.log(this.expenses)
    //     this.msg = 'Vendors, Products loaded';
    //   },
    //   err => {this.msg += 'Error occurred - expenses not loaded - ' + err.status + ' - ' + err.statusText;
    //   });
    this.currentPage = 0;
    this.getPagedExpenses();
  }
  select(expense: Product) {
    this.todo = 'update';
    this.selectedExpense = expense;
    this.msg = 'Expense ' + expense.id + ' selected';
    this.hideEditForm = !this.hideEditForm;
  } // select
  /**
   * cancelled - event handler for cancel button
   */
  cancel(msg?: string) {
    if (msg) {
      this.msg = 'Operation cancelled';
    }
    this.hideEditForm = !this.hideEditForm;
  } // cancel
  /**
   * update - send changed update to service update local array
   */
  update(expense: Product) {
    // expense.vendor = 1;
    this.msg = 'Updating...';
    this.restService.update(this.url, expense).subscribe(
      payload => {
        if (payload.id !== '') {
          this.getPagedExpenses();
// update local array using ? operator
          this.expenses = this.expenses.map(exp => exp.id === expense.id ? (<any>Object).assign({}, exp, payload) : exp);
          this.msg = 'Expense ' + expense.id + ' updated!';
        } else {
          this.msg = 'Expense not updated! - Server problem';
        }
      },
      err => {
        this.msg = 'Error - expense not updated - ' + err.status + ' - ' + err.statusText;
      }
    );
    this.hideEditForm = !this.hideEditForm;
  } // update
  /**
   * save - determine whether we're doing and add or an update
   */
  save(product: Product) {
    if ( product.Add) {
      this.add(product);
    } else {
      this.update(product);
    }
  } // save
  /**
   * add - send expense to service, receive newid back
   */
  add(expense: Product) {
    this.msg = 'Adding...';

    this.restService.add(this.url, expense).subscribe(
      payload => {
        if (payload.id !== '') { // server returns new id
          this.getPagedExpenses();
          this.expenses = [...this.expenses, payload]; // add expense to current array using spread
          expense.id = payload.id;
          this.msg = 'Expense ' + expense.id + ' added!';
        } else {
          this.msg = 'Expense not added! - server error';
        }
      },
      err => {
        this.msg = 'Error - expense not added - ' + err.status + ' - ' + err.statusText;
      }
    );
    this.hideEditForm = !this.hideEditForm;
  } // add
  /**
   * newExpense - create new expense instance
   */
  newExpense() {
    this.selectedExpense = { id: null, vendor: null, name: '',
      costprice: null, msrp: null, rop: null, qoh: null, qoo: null, eop: null, qrcode: null, qrcodetxt: null, Add: false };

    this.msg = 'New Product';
    this.hideEditForm = !this.hideEditForm;
  } // newExpense
  /**
   * delete - send expense id to service for deletion and remove from local collection
   */
  delete(expense: Product) {
    this.msg = 'Deleting...';
    this.restService.delete(this.url, expense.id).subscribe(
      payload => {
        if (payload === 1) { // server returns # rows deleted
          this.getPagedExpenses();
          this.msg = 'Expense ' + expense.id + ' deleted!';
          this.expenses = this.expenses.filter(exp => exp.id !== expense.id);
        } else {
          this.msg = 'Expense not deleted! - server error';
        }
      },
      err => {
        this.msg = 'Error - vendors not deleted - ' + err.status + ' - ' + err.statusText;
      }
    );
    this.hideEditForm = !this.hideEditForm;
  } // delete

  changePage($pageEvent?: PageEvent) {
    this.currentPage = $pageEvent.pageIndex;
    this.getPagedExpenses();
  } // changePage
  getPagedExpenses() {
    this.restService.load(`${BASEURL}pagedexpenses?&p=${this.currentPage}&s=5`).subscribe(
      payload => {
        this.expenses = payload.content;
        this.msg = `page ${payload.number + 1} of products loaded`;
        if (this.totalElements !== payload.totalElements) {
          // reset paginator
          this.paginator.firstPage();
          this.totalElements = payload.totalElements;
        }
      },
      err => {this.msg += 'Error occurred - products not loaded - ' + err.status + ' - ' + err.statusText;
      });
  } // getPageExpenses

} // ExpenseHomeComponent
