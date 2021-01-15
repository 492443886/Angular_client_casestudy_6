import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// added imports
import { MatSelectModule, MatButtonModule, MatCardModule, MatMenuModule, MatInputModule} from '@angular/material';
import { MatToolbarModule, MatIconModule, MatListModule, MatFormFieldModule, MatDialogModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VendorHomeComponent } from './vendor-home.component';
import { VendorListComponent} from './vendor-list.component';
import { EmployeeDetailComponent } from './vendor-detail.component';
import { DeleteDialogComponent } from '../deletedialog/delete-dialog.component';
@NgModule({
  declarations: [
    VendorHomeComponent, VendorListComponent, EmployeeDetailComponent,  DeleteDialogComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    DeleteDialogComponent
  ]

})
export class VendorModule { }
