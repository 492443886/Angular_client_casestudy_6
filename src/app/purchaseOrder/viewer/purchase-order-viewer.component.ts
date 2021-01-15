import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Vendor } from '../../vendor/vendor';
import { RestfulService } from '../../restful.service';
import { Product } from '../../product/product';
import { PurchaseOrderLineitem } from '../purchaseOrderLineitem';
import { PurchaseOrder } from '../purchaseOrder';
import { BASEURL, PDFURL } from '../.././constants';



@Component({
  templateUrl: './purchase-order-viewer.html'
})
export class PurchaseOrderViewerComponent implements OnInit {
  url: string;
  msg: string;


  generatorForm: FormGroup;
  vendorid: FormControl;
  poid: FormControl;

  vendors: Array<Vendor>;
  selectedVendor: Vendor;
  products: Array<Product>;
  pos: Array<PurchaseOrder>;
  selectedPo: PurchaseOrder;

  constructor(private builder: FormBuilder, private restService: RestfulService) {
    this.url = BASEURL + 'pos';
  } // constructor

  ngOnInit() {
    this.vendorid = new FormControl('');
    this.poid = new FormControl('');
    this.generatorForm = this.builder.group({
      vendorid: this.vendorid,
      poid: this.poid
    });

    this.onPickVendor();
    this.onPickPo();

    this.restService.load(BASEURL + 'vendors').subscribe(
      employeePayload => {
        this.vendors = employeePayload;
        this.msg = 'vendor loaded';

        this.restService.load(BASEURL + 'Product').subscribe(
          expensePayload => {
            this.pos = expensePayload;
            this.msg = 'vendor loaded';
          },
          err => {this.msg += 'Error occurred - expenses not loaded - ' + err.status + ' - ' +
            err.statusText;
          });
      },
      err => {this.msg += 'Error occurred - employees not loaded - ' + err.status + ' - ' +
        err.statusText;
      });

  } // ngOnInit

  onPickVendor(): void {
    this.generatorForm.get('vendorid').valueChanges.subscribe(val => {
      if (val) {
        this.selectedVendor = val;
        this.restService.load(BASEURL + 'pos/' + this.selectedVendor.id).subscribe(
          expensePayload => {
            this.pos = expensePayload;
            this.msg = 'pos loaded for - ' + this.selectedVendor.name;
          },
          err => {this.msg += 'Error occurred - expenses not loaded - ' + err.status + ' - ' +
            err.statusText;
          });
      }
    });
  }
  onPickPo(): void {
    this.generatorForm.get('poid').valueChanges.subscribe(val => {
      if (val) {
        this.selectedPo = val;
      }
    });
  }

  viewPdfOnClick() {
    window.open(PDFURL + this.selectedPo.id, '');
  } // viewPdf

} // ReportGeneratorComponent
