import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
  MatSelectModule, MatButtonModule, MatInputModule, MatToolbarModule,
  MatIconModule, MatCardModule, MatTooltipModule, MatListModule, MatExpansionModule, MatPaginatorModule
} from '@angular/material';
import { CovalentDataTableModule } from '@covalent/core';
import { ProductHomeComponent } from './product-home.component';
import { ProductTableComponent } from './product-table.component';
import { ProductDetailComponent } from './product-detail.component';
import { CovalentExpansionPanelModule } from '@covalent/core/expansion-panel';
@NgModule({
  imports: [BrowserModule, MatPaginatorModule,
    CovalentExpansionPanelModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatExpansionModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatToolbarModule,
    MatTooltipModule,
    MatIconModule,
    CovalentDataTableModule],
  declarations: [ProductHomeComponent, ProductTableComponent, ProductDetailComponent]
})

export class ProductModule {}
