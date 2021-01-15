import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from './product';
@Component({
  selector: 'app-expense-table',
  templateUrl: 'product-table.html'
})
export class ProductTableComponent {
  @Input() expenses: Product[];
  @Output() selected = new EventEmitter();
  @Output() newed = new EventEmitter();
  sortedExpenses: Product[];
  sortOrder: boolean;
  sortedColumn: string;
  constructor() {
    this.sortOrder = true;
    this.sortedColumn = 'id';
  } // constructor
  /**
   * sortExpenses - sort based on column clicked, toggle between ascending/descending
   * return negative 1 if the first item is smaller;
   * positive 1 if it it's larger
   */
  sortExpenses(col) {
    this.sortedColumn = col;
    this.sortOrder = !this.sortOrder;
    this.sortedExpenses = this.expenses.slice(0);
    if (this.sortOrder) { // ascending
      this.sortedExpenses.sort((left, right): number => {
        return (left[col] < right[col]) ? -1 : 1;
      });
    } else { // descending
      this.sortedExpenses.sort((left, right): number => {
        return (left[col] > right[col]) ? -1 : 1;
      });
    }
    this.expenses = this.sortedExpenses;
  } // sortExpenses
} // ExpenseTableComponent
