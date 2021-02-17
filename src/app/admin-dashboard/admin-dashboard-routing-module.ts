import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FooteronlylayoutComponent } from '../layout/footeronlylayout/footeronlylayout.component';
import { LayoutComponent } from '../layout/layout.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddProductComponent } from './add-product/add-product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardlayoutComponent } from './dashboardlayout/dashboardlayout.component';
import { DashuserComponent } from './dashuser/dashuser.component';
import { EditcategoryComponent } from './editcategory/editcategory.component';
import { EditshopdetailComponent } from './editshopdetail/editshopdetail.component';
import { EditshopdetailinfoComponent } from './editshopdetailinfo/editshopdetailinfo.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OrdermanagementComponent } from './ordermanagement/ordermanagement.component';
import { PaymentsDetailComponent } from './payments-detail/payments-detail.component';
import { ProductComponent } from './product/product.component';
import { SidebarComponent } from './sidebar/sidebar.component';




const routes: Routes = [

  {
    path: 'dashboard',
    component: DashboardlayoutComponent,
    children: [
      { path: '', component: DashboardComponent },
    ]

  },

  {
    path: 'sidebar',
    component: DashboardlayoutComponent,
    children: [
      { path: '', component: SidebarComponent },
    ]

  },

  {
    path: 'product',
    component: DashboardlayoutComponent,
    children: [
      { path: '', component: ProductComponent },
    ]

  },

  {
    path: 'add_product',
    component: DashboardlayoutComponent,
    children: [
      { path: '', component: AddProductComponent },
    ]
  },

  {
    path: 'order',
    component: DashboardlayoutComponent,
    children: [
      { path: '', component: OrdermanagementComponent },
    ]
  },

  {
    path: 'payments',
    component: DashboardlayoutComponent,
    children: [
      { path: '', component: PaymentsDetailComponent },
    ]
  },

  {
    path: 'order_detail:id',
    component: DashboardlayoutComponent,
    children: [
      { path: '', component: OrdermanagementComponent },
    ]
  },

  {
    path: 'shop_detail',
    component: DashboardlayoutComponent,
    children: [
      { path: '', component: EditshopdetailComponent },
    ]
  },

  {
    path: 'shop_info/bank/:id',
    component: DashboardlayoutComponent,
    children: [
      { path: '', component: EditshopdetailinfoComponent },
    ]
  },

  {
    path: 'member',
    component: DashboardlayoutComponent,
    children: [
      { path: '', component: DashuserComponent },
    ]
  },

  {
    path: 'category',
    component: DashboardlayoutComponent,
    children: [
      { path: '', component: AddCategoryComponent },
    ]
  },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DashboardRouting { }



