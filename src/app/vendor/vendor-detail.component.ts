import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';


import { ValidatePhone } from '../validators/phoneno.validator';
import { ValidateEmail } from '../validators/email.validator';
import { ValidatePostCode } from '../validators/PostCode.validator';
import { Vendor } from './vendor';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DeleteDialogComponent} from '../deletedialog/delete-dialog.component';

@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.html'
})
export class EmployeeDetailComponent implements OnInit {
// setter is used to assign selected employee after click
  @Input('employee') set _employee(value: Vendor) {
    if (value) {
      this.originalName = value.name;
    }
    this.selectedEmployee = (<any>Object).assign({}, value);
  }
  @Output() cancelled = new EventEmitter();
  @Output() saved = new EventEmitter();
  @Output() deleted = new EventEmitter();
  employeeForm: FormGroup;

  name: FormControl;
  address1: FormControl;
  city: FormControl;
  province: FormControl;
  postalcode: FormControl;
  phone: FormControl;
  type: FormControl;
  email: FormControl;





  originalName: string;
  selectedEmployee: Vendor;
  constructor(private builder: FormBuilder, public dialog: MatDialog) {


    this.name = new FormControl('', Validators.compose([Validators.required]));
    this.address1 = new FormControl('', Validators.compose([Validators.required]));
    this.city = new FormControl('', Validators.compose([Validators.required]));
    this.province = new FormControl('', Validators.compose([Validators.required]));
    this.postalcode = new FormControl('', Validators.compose([Validators.required, ValidatePostCode]));
    this.phone = new FormControl('', Validators.compose([Validators.required, ValidatePhone]));
    this.type = new FormControl('', Validators.compose([Validators.required]));
    this.email = new FormControl('', Validators.compose([Validators.required , ValidateEmail]));



  } // constructor
  ngOnInit() {
    this.employeeForm = this.builder.group({
      name: this.name,
      address1: this.address1,
      city: this.city,
      province: this.province,
      postalcode: this.postalcode,
      phone: this.phone,
      type: this.type,
      email: this.email
    });
// patchValue doesn’t care if all values present
    this.employeeForm.patchValue({
      name: this.selectedEmployee.name,
      address1: this.selectedEmployee.address1,
      city: this.selectedEmployee.city,
      province: this.selectedEmployee.province,
      postalcode: this.selectedEmployee.postalcode,
      phone: this.selectedEmployee.phone,
      type: this.selectedEmployee.type,
      email: this.selectedEmployee.email
    });
  } // ngOnInit
  updateSelectedEmployee() {
    const frmJson = this.employeeForm.getRawValue();
    this.selectedEmployee.name = frmJson.name;
    this.selectedEmployee.address1 = frmJson.address1;
    this.selectedEmployee.city = frmJson.city;
    this.selectedEmployee.province = frmJson.province;
    this.selectedEmployee.postalcode = frmJson.postalcode;
    this.selectedEmployee.phone = frmJson.phone;
    this.selectedEmployee.type = frmJson.type;
    this.selectedEmployee.email = frmJson.email;
    this.saved.emit(this.selectedEmployee);
  }

  openDeleteModal(selectedEmployee: Vendor) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      title: `Delete ${this.selectedEmployee.name}`,
      entityname: 'vendor'
    };
    dialogConfig.panelClass = 'custommodal';
    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleted.emit(this.selectedEmployee);
      }
    });
  } // openDeleteModal
} // EmployeeDetailComponent
