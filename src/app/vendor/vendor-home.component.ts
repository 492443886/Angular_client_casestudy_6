import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription} from 'rxjs';
import { Vendor } from './vendor';
// import { VendorService } from './vendor.service';
import { BASEURL } from '../constants';
import { RestfulService } from '../restful.service';
@Component({
  selector: 'app-exercises',
  templateUrl: './vendor-home.html'
})
export class VendorHomeComponent implements OnInit {
  employees: Array<Vendor>;
  selectedVendor: Vendor;
  hideEditForm: boolean;
  msg: string;
  todo: string;
  url: string;
  constructor(public restService: RestfulService) {
    this.hideEditForm = true;
    this.url = BASEURL + 'vendors';
  } // constructor
  ngOnInit() {
    this.msg = 'loading employees from server...';
    this.restService.load(this.url).subscribe(
      payload => {

        this.employees = payload;
        this.msg = 'vendors loaded!!';
      },
      err => {
        this.employees = [];
        this.msg = 'Error - vendors not loaded - ' + err.status + ' - ' + err.statusText;
      });
  } // ngOnInit
  select(vendor: Vendor) {
    this.todo = 'update';
    this.selectedVendor = vendor;
    this.msg = vendor.name + ' selected';
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
  update(vendor: Vendor) {
    this.restService.update(this.url, vendor).subscribe( payload => {
        if (payload.id > 0) {
// update local array using ? operator
          this.employees = this.employees.map(emp => emp.id === vendor.id ? (<any>Object).assign({}, emp, vendor) : emp);
          this.msg = 'Vendor ' + vendor.id + ' updated!';
        } else {
          this.msg = 'Vendor not updated! - server error';
        }
        this.hideEditForm = !this.hideEditForm;
      },
      err => {
        this.msg = 'Error - Vendor not updated - ' + err.status + ' - ' + err.statusText;
      });
  } // update

  /**
   * save - determine whether we're doing and add or an update
   */
  save(employee: Vendor) {
    (employee.id) ? this.update(employee) : this.add(employee);
  } // save

  delete(employee: Vendor) {
    this.restService.delete(this.url, employee.id)
      .subscribe(payload => {
          if (payload === 1) { // server returns # rows deleted
            this.msg = 'Vendor ' + employee.id + ' deleted!';
            this.employees = this.employees.filter(emp => emp.id !== employee.id);
          } else {
            this.msg = 'Vendor not deleted!';
          }
          this.hideEditForm = !this.hideEditForm;
        },
        err => {
          this.msg = 'Error - Vendor not deleted - ' + err.status + ' - ' + err.statusText;
        });
  } // delete
  add(employee: Vendor) {
    employee.id = 0;
    this.restService.add(this.url, employee)
      .subscribe(payload => {
          if (payload.id > 0) { // server returns new id in returned json
            this.employees = [...this.employees, employee]; // add employee to current array using spread
            employee.id = payload.id;
            this.msg = 'Vendor ' + employee.id + ' added!';
          } else {
            this.msg = 'Vendor addition failed!';
          }
          this.hideEditForm = !this.hideEditForm;
        },
        err => {
          this.msg = 'Error - Vendor addition failed - ' + err.status + ' - ' + err.statusText;
        });
  } // add

  newVendor() {
    this.selectedVendor = {
      id: null,
      name: '',
      address1: '',
      city: '',
      province: '',
      postalcode: '',
      phone: '',
      type: '',
      email: ''
    };
    this.msg = 'New Vendor';
    this.hideEditForm = !this.hideEditForm;
  } // newEmployee
}
