
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ReportModule } from './purchaseOrder/purchaseOrder.module';
// added imports
import {MatButtonModule, MatCardModule, MatMenuModule, MatInputModule, MatExpansionModule} from '@angular/material';
import { MatToolbarModule, MatIconModule, MatListModule, MatFormFieldModule, MatSelectModule } from '@angular/material';
import { CovalentLayoutModule } from '@covalent/core/layout';
import { CovalentStepsModule } from '@covalent/core/steps';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginModule  } from './login/login.module';
import { VendorModule } from './vendor/vendor.module';
import { routing } from './app.routing';
import { ProductModule } from './product/product.module';
@NgModule({
  declarations: [
    AppComponent, HomeComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CovalentLayoutModule,
    CovalentStepsModule,
    VendorModule,
    FormsModule,
    ProductModule,
    ReportModule,
    HttpClientModule,
    LoginModule,
    MatButtonModule,
    MatMenuModule,
    MatExpansionModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    ReactiveFormsModule,
    RouterModule,
    routing
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }






// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatButtonModule, MatCardModule, MatMenuModule, MatInputModule} from '@angular/material';
// import { MatToolbarModule, MatIconModule, MatListModule, MatFormFieldModule } from '@angular/material';
// import { CovalentLayoutModule } from '@covalent/core/layout';
// import { CovalentStepsModule } from '@covalent/core/steps';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';
//
//
// import { VendorHomeComponent } from './vendor/vendor-home.component';
// import { VendorListComponent} from './vendor/vendor-list.component';
// import { AppComponent } from './app.component';
// import { EmployeeDetailComponent } from './vendor/vendor-detail.component';
//
// import { RouterModule } from '@angular/router';
// import { routing } from './app.routing';
//
// import { HomeComponent } from './home/home.component';
// @NgModule({
//   declarations: [
//     AppComponent, HomeComponent, VendorHomeComponent, VendorListComponent, EmployeeDetailComponent
//   ],
//   imports: [
//     BrowserAnimationsModule,
//     BrowserModule,
//     CovalentLayoutModule,
//     MatFormFieldModule,
//     MatInputModule,
//     CovalentStepsModule,
//     FormsModule,
//     ReactiveFormsModule,
//     HttpClientModule,
//     MatButtonModule,
//     MatCardModule,
//     MatIconModule,
//     MatListModule,
//     MatMenuModule,
//     MatToolbarModule,
//     RouterModule,
//     routing
//   ],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }
