import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VendorHomeComponent } from './vendor/vendor-home.component';
import { ProductHomeComponent } from './product/product-home.component';
import { PurchaseOrderGeneratorComponent } from './purchaseOrder/generator/purchase-order-generator.component';
import {PurchaseOrderViewerComponent} from './purchaseOrder/viewer/purchase-order-viewer.component';
import { AuthGuard } from './login/auth-guard.service';
import { LoginHomeComponent } from './login/login-home.component';
const appRoutes: Routes = [
  { path: 'login', component: LoginHomeComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'vendor', component: VendorHomeComponent, canActivate: [AuthGuard] },
  { path: 'product', component: ProductHomeComponent, canActivate: [AuthGuard] },
  { path: 'generator', component: PurchaseOrderGeneratorComponent, canActivate: [AuthGuard] },
  { path: 'viewer', component: PurchaseOrderViewerComponent, canActivate: [AuthGuard]  },
  { path: '', component: HomeComponent}
];
export const routing = RouterModule.forRoot(appRoutes);
