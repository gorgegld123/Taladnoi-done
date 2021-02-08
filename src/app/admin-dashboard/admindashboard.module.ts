import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRouting } from './admin-dashboard-routing-module';
import { DashboardlayoutComponent } from './dashboardlayout/dashboardlayout.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductComponent } from './product/product.component';
import { AddProductComponent } from './add-product/add-product.component';
import {FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { EditproductComponent } from './editproduct/editproduct.component';
import { NiceSelectModule } from "ng-nice-select";
import { EditcategoryComponent } from './editcategory/editcategory.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatTreeModule} from '@angular/material/tree';
import { AppRoutingModule } from '../app-routing.module';
import { CategoryaddComponent } from './categoryadd/categoryadd.component';
import { OrdermanagementComponent } from './ordermanagement/ordermanagement.component';
import { OrderDetailComponent } from './ordermanagement/order-detail/order-detail.component';
import { QuillModule } from 'ngx-quill';
import { PipeexportModule } from '../pipeexport/pipeexport.module';
import { SumPipe } from './ordermanagement/order-detail/sum.pipe';
import { PaymentsDetailComponent } from './payments-detail/payments-detail.component';
import { DataTablesModule } from "angular-datatables";
import { LightboxModule } from 'ngx-lightbox';





@NgModule({
  imports: [
    CommonModule,
    DashboardRouting,
    FormsModule,
    ReactiveFormsModule,
    NiceSelectModule,
    DragDropModule,
    MatTreeModule,
    QuillModule.forRoot(),
    PipeexportModule,
    DataTablesModule,
    LightboxModule
  ],

  exports: [
    DashboardComponent,
    DashboardlayoutComponent
  ],
  declarations: [
    DashboardComponent,
    DashboardlayoutComponent,
    SidebarComponent,
    NavbarComponent,
    ProductComponent,
    AddProductComponent,
    EditproductComponent,
    EditcategoryComponent,
    AddCategoryComponent,
    CategoryaddComponent,
    OrdermanagementComponent,
    OrderDetailComponent,
    SumPipe,
    PaymentsDetailComponent,
    
  ]
})

export class AdminDashboardModule { }
