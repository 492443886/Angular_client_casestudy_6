import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Vendor } from './vendor';
@Component({
  selector: 'app-vendor-list',
  template:
    `
<mat-list-item *ngFor="let vendor of vendors" layout="row" (click)="selected.emit(vendor)" class="pad-xs mat-title">
{{ vendor.id }} - {{ vendor.name}}
</mat-list-item>
<div>
  <mat-icon id = "addvendor" (click)="newed.emit()" matTooltip="Add New Vendor" color="primary" class="mat-36 pad-top-xxl">
    control_point
  </mat-icon>
</div>
      `
})
export class VendorListComponent {
  @Input() vendors: Vendor[];
  @Output() selected = new EventEmitter();
  @Output() newed = new EventEmitter();
}
