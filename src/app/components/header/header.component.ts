import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductComponent } from 'src/app/admin-dashboard/product/product.component';
import { Product } from '../products/shared/product.model';
import { CrudService } from '../services/crud.service';
import { MessengerService } from '../services/messenger.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenService } from '../services/loginservice/authen.service';
import { AccountService } from '../services/account.service';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  id: number;
  //cartItems : any;
  cartItems = [];
  Shoplist : any;
  productTotal: number;
  isLogin: boolean = false;
  constructor(private msg: MessengerService, private CrudService: CrudService, private toastr: ToastrService 
    ,private authen:AuthenService , private account:AccountService , private router:Router) {
    this.msg.CartNumber.subscribe((data: number) => {
      this.cartValue = data;
    });

    this.msg.CartProduct.subscribe((data2: any) => {
      this.cartItems = data2;
    });

    this.msg.CartTotal.subscribe((data3: any) => {
      this.productTotal = data3;
    });

    //this.cartItems = Array.of(this.cartItems);  
  }

  ngOnInit(): void {
    // this.msg.getMsg().subscribe((product: Product) => 
    //   this.addProductToCart(product) 
    //  )
    this.initialLoadUserLogin()
    this.cartDetail();
    this.cartItemValue();
    this.calTotal();

    this.CrudService.getShoplist().subscribe(
      (shoplist) => {
        //console.log(products);
        this.Shoplist = shoplist;
        //this.product = Array.of(products);
      }
    );
    //console.log(this.cartItems)
  }

  showLoader(){
    setTimeout(location.reload.bind(location), 500);
  }
  
  onLogout() {
    this.authen.clearAuthenticated();
    localStorage.removeItem('cart');
    setTimeout(location.reload.bind(location), 500);
    console.log(this.UserLogin)
  }

  calTotal() {
    let sum = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      //console.log(i);
      sum += this.cartItems[i].total;

    }
    this.productTotal = sum;
  }

  cartValue = 0;
  cartItemValue() {
    if (localStorage.getItem('cart') != null) {
      var cartCount = JSON.parse(localStorage.getItem('cart'));
      //console.log(cartCount)
      this.cartValue = cartCount.length;
    }
  }

  cartDetail() {
    if (localStorage.getItem('cart')) {
      this.cartItems = JSON.parse(localStorage.getItem('cart'));
      //console.log(this.cartItems);
    }
  }

  removeCartItem(cartItems, i) {
    cartItems.splice(i, 1)
    localStorage.setItem('cart', JSON.stringify(cartItems));
    //console.log(cartItems)
    this.cartItemValue();
    this.calTotal();
  }

  // using rxjs next subject method
  addProductToCart(product: Product) {
    this.cartItems.push({ product })
    //localStorage.setItem('cart' , JSON.stringify(product));
  }


  public onAddtoCart() {
    console.log(this.cartItems)
    // this.cartItems = this.CrudService.addtoCart;
    // this.cartItems = Array.of(this.cartItems);  

  }

  objectKeys(obj) {
    return Object.keys(obj);
  }

  Checkout(cartItems) {
    this.msg.sendMsgCheckout(cartItems);
    //console.log(cartItems)
    //this.toastr.success('เพิ่มสินค้าเข้าตะกร้าสินค้า', 'สำเร็จ !');
  }

  anchorShoplist() {
    document.getElementById("shoplist").scrollIntoView({ behavior: "smooth" });
  }


  UserLogin : any;
  initialLoadUserLogin() {
    this.UserLogin = this.account.UserLogin;
    if (this.UserLogin.id) { return; }
    this.account
        .getUserLogin(this.authen.getAuthenticated())
        .then(userLogin => this.UserLogin = userLogin )
        .catch();     
  }

}
