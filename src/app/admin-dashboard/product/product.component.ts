import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Categorie } from 'src/app/components/products/shared/categorie.model';
import { Product } from 'src/app/components/products/shared/product.model';
import { AccountService } from 'src/app/components/services/account.service';

import { CrudService } from 'src/app/components/services/crud.service';
import { AuthenService } from 'src/app/components/services/loginservice/authen.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  CloseResult = '';
  id: number;
  category: any;
  searchFilters: string;
  product: any;
  UserLogin: any;
  userID = '1';

  imageDirectoryPath = 'http://ta-lad-noi.com/taladnoiapi/product/';

  constructor(private CrudService: CrudService,
    private account: AccountService,
    private authen: AuthenService) { }

  ngOnInit() {
    // this.CrudService.getProduct().subscribe(
    //   (products) => {
    //     console.log(products);
    //     this.product = products;
    //   }
    // );

    // this.userID = this.UserLogin.userID;

    // this.CrudService.getCategorie().subscribe(
    //   (categories) => {
    //     //console.log(categories)
    //     this.category = categories;
    //   }
    // );
    this.initialLoadUserLogin();

  }

  initialLoadUserLogin() {
    this.UserLogin = this.account.UserLogin;
    if (this.UserLogin.id) { return; }
    this.account
      .getUserLogin(this.authen.getAuthenticated())
      .then(userLogin => (this.UserLogin = userLogin,
        this.queryProductViaSession()))
      .catch();
    console.log(this.UserLogin)
  }

  queryProductViaSession() {
    this.CrudService.getProductViaSession(this.UserLogin.userID).subscribe((res) => {
      this.product = res;
      console.log(this.product)
    })
  }

  // drop(event: CdkDragDrop<string[]>) {
  //   moveItemInArray(this.category.name, event.previousIndex, event.currentIndex);
  // }



  get products() {
    return this.product ?
      this.product.filter((product) =>
        this.searchFilters ?
          product.pname.toLowerCase().includes(this.searchFilters) : product)
      : this.product;
  }

  /** เมื่อมีการกดปุ่มแก้ไขของแถวนั้นๆ */
  onEditModal(p: Product) {
    Object.assign(this.CrudService.updateProduct, p);
    //this.CrudService.updateProduct.pname = p.pname;
    //console.log(p)
    console.log(this.CrudService.updateProduct)
  }

}
