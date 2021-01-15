import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; // model driven forms
import { BrowserModule } from '@angular/platform-browser';
import {
  MatSelectModule, MatButtonModule, MatInputModule, MatToolbarModule,
  MatIconModule, MatCardModule, MatTooltipModule, MatListModule
} from '@angular/material';
import { CovalentDataTableModule } from '@covalent/core';
import { PurchaseOrderGeneratorComponent} from './generator/purchase-order-generator.component';
import { PurchaseOrderViewerComponent} from './viewer/purchase-order-viewer.component';
@NgModule({
  imports: [BrowserModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatToolbarModule,
    MatTooltipModule,
    MatIconModule,
    CovalentDataTableModule],
  declarations: [PurchaseOrderGeneratorComponent, PurchaseOrderViewerComponent],
  exports: [PurchaseOrderGeneratorComponent, PurchaseOrderViewerComponent]
})
export class ReportModule { }
