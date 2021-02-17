import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { ThankyouComponent } from './components/thankyou/thankyou.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule , ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { ProductDetailComponent } from './components/products/product-detail/product-detail.component';
import { LayoutComponent } from './layout/layout.component';
import { FooteronlylayoutComponent } from './layout/footeronlylayout/footeronlylayout.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NiceSelectModule } from "ng-nice-select";
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { LoginComponent } from './components/login/login.component';
import { SharedsModule } from './components/services/loginservice/shareds.module';
import { CfCheckoutComponent } from './components/checkout/cf-checkout/cf-checkout.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { FilterPipe } from './Pipes/filter.pipe';
import { SortPipe } from './Pipes/sort.pipe';
import { RegisterPageComponent } from './register-page/register-page.component';
import { QuillModule } from 'ngx-quill'
import { PipeexportModule } from './pipeexport/pipeexport.module';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileDetailComponent } from './components/profile/profile-detail/profile-detail.component';
import { ProfileSidebarComponent } from './components/profile/profile-sidebar/profile-sidebar.component';
import { ProfileOrderComponent } from './components/profile/profile-order/profile-order.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { UserOrderdetailComponent } from './components/profile/profile-order/user-orderdetail/user-orderdetail.component';
import { RemovePipe } from './Pipes/remove-pipe.pipe';
import { ShopinfoComponent } from './components/products/shopinfo/shopinfo.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// Import library module
import { NgxSpinnerModule } from "ngx-spinner";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    CheckoutComponent,
    HomeComponent,
    ProductsComponent,
    ThankyouComponent,
    ProductDetailComponent,
    LayoutComponent,
    FooteronlylayoutComponent,
    CartItemComponent,
    LoginComponent,
    CfCheckoutComponent,
    BreadcrumbsComponent,
    SortPipe,
    RegisterPageComponent,
    ProfileComponent,
    ProfileDetailComponent,
    ProfileSidebarComponent,
    ProfileOrderComponent,
    UserOrderdetailComponent,
    RemovePipe,
    ShopinfoComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    QuillModule.forRoot(),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NiceSelectModule,
    SharedsModule,
    PipeexportModule,
    SlickCarouselModule,
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }


