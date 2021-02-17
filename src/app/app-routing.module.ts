import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductDetailComponent } from './components/products/product-detail/product-detail.component';
import { LayoutComponent } from './layout/layout.component';
import { FooteronlylayoutComponent } from './layout/footeronlylayout/footeronlylayout.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AuthenticationGuard } from './components/services/loginservice/authentication.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardlayoutComponent } from './admin-dashboard/dashboardlayout/dashboardlayout.component';
import { ProfileOrderComponent } from './components/profile/profile-order/profile-order.component';
import { ProfileDetailComponent } from './components/profile/profile-detail/profile-detail.component';
import { UserOrderdetailComponent } from './components/profile/profile-order/user-orderdetail/user-orderdetail.component';
import { ShopinfoComponent } from './components/products/shopinfo/shopinfo.component';




const routes: Routes = [
{
  path: '' , component: LayoutComponent,
  children: [
    { path: '', component: HomeComponent },
  ]
},
{
  path: 'products/shop/:shopID' , component: LayoutComponent,
  children: [
    { path: '', component: ProductsComponent },
  ]
},
{
  path: 'product/:id' , component: LayoutComponent ,
  children: [
    { path: '', component: ProductDetailComponent },
  ]
},
{
  path: 'cart' , component:  FooteronlylayoutComponent,
  children: [
    { path: '', component: CartComponent },
  ]
},
{
  path: 'checkout' , component:  LayoutComponent,
  children: [
    { path: '', component: CheckoutComponent }
  ]
  ,canActivate: [AuthenticationGuard]
},

{
  path: 'footer' , component: FooterComponent
},

{
  path:'login' , component: LoginComponent
},
{
  path:'register' , component: RegisterPageComponent
},
{
  path:'info/:shopID' , component: ShopinfoComponent
},
{
  path:'order' , component: ProfileComponent, children: [{path: '', component: ProfileOrderComponent}]
},

{
  path:'profile' , component: ProfileComponent, children: [{path: '', component: ProfileDetailComponent}]
},
{
  path:'order-detail' , component: ProfileComponent, children: [{path:'', component:UserOrderdetailComponent}]
},



{ path : 'auth' , loadChildren: () => import('./admin-dashboard/admindashboard.module').then(m => m.AdminDashboardModule) ,canActivate: [AuthenticationGuard]}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
