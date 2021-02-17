import { HttpClient } from '@angular/common/http';
import { QueryValueType } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { __assign } from 'tslib';
import { Product } from '../products/shared/product.model';
import { AccountService, IAccount } from '../services/account.service';
import { CrudService } from '../services/crud.service';
import { AuthenService } from '../services/loginservice/authen.service';
import { MessengerService } from '../services/messenger.service';
declare const $: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})


export class CheckoutComponent implements OnInit {

  public cartCheckout: any = [];
  UserLogin: any = [];
  total: number = 0;
  productTotal: number;
  checkoutForm: FormGroup;
  orderNo;
  currentDate = new Date();
  productbyShop : any;




  constructor(private msg: MessengerService, private toastr: ToastrService, private fb: FormBuilder, private CrudService: CrudService,
    private authen: AuthenService, private account: AccountService , private router:Router) {
    // this.msg.CartCheckout.subscribe((checkout : any) => {
    //   this.cartCheckout = checkout;
    // });
    this.initialLoadUserLogin();
  }

  ngOnInit(): void {
    // this.msg.getMsgCheckout().subscribe((checkout: any) => {
    //   this.addProductCartToCheckout(checkout)
    // })
    this.genOrderID();
    this.cartToCheckout();
    this.calTotal();


    this.checkoutForm = this.fb.group({
      orderNo: [this.orderNo],
      user_id: [null],
      fullname: [null],
      // user_id: [this.UserLogin.userID],
      // fullname: [this.UserLogin.firstname + ' ' + this.UserLogin.lastname],
      email: [null],
      product_id: [this.cartCheckout, Validators.required],
      quantity: [this.cartCheckout.length],
      total: [this.productTotal, Validators.required],
      phone: [null],
      address: [null],
      order_status: ['pending']
    });
  

    //jQuery time
    var current_fs, next_fs, previous_fs; //fieldsets
    var left, opacity, scale; //fieldset properties which we will animate
    var animating; //flag to prevent quick multi-click glitches
    var userLog : boolean = true;


    $(".next").click(function () {
        if(animating) return false;
      animating = true;

      current_fs = $(this).parent();
      next_fs = $(this).parent().next();

      //activate next step on progressbar using the index of next_fs
      $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

      //show the next fieldset
      next_fs.show();
      //hide the current fieldset with style
      current_fs.animate({
        opacity: 0
      }, {
        step: function (now, mx) {
          //as the opacity of current_fs reduces to 0 - stored in "now"
          //1. scale current_fs down to 80%
          scale = 1 - (1 - now) * 0.2;
          //2. bring next_fs from the right(50%)
          left = (now * 50) + "%";
          //3. increase opacity of next_fs to 1 as it moves in
          opacity = 1 - now;
          current_fs.css({
            'transform': 'scale(' + scale + ')',
            'position': 'absolute'
          });
          next_fs.css({
            'left': left,
            'opacity': opacity
          });
        },
        duration: 800,
        complete: function () {
          current_fs.hide();
          animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
      });
      $("html, body").animate({ scrollTop: 0 }, "slow");
      
    });



    $(".previous").click(function () {
      $("html, body").animate({ scrollTop: 0 }, "slow");
      if (animating) return false;
      animating = true;

      current_fs = $(this).parent();
      previous_fs = $(this).parent().prev();

      //de-activate current step on progressbar
      $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

      //show the previous fieldset
      previous_fs.show();
      //hide the current fieldset with style
      current_fs.animate({
        opacity: 0
      }, {
        step: function (now, mx) {
          //as the opacity of current_fs reduces to 0 - stored in "now"
          //1. Add Scale 80 - 100%
          scale = 0.8 + (1 - now) * 0.2;
          //2. var current_fs to the right(50%) - from 0%
          left = ((1 - now) * 50) + "%";
          //3. เพิ่ม Opacity 
          opacity = 1 - now;
          current_fs.css({
            'left': left
          });
          previous_fs.css({
            'transform': 'scale(' + scale + ')',
            'position': 'relative',
            'opacity': opacity
          });
        },
        duration: 800,
        complete: function () {
          current_fs.hide();
          animating = false;
        },
        easing: 'easeInOutBack'
      });
      $("html, body").animate({ scrollTop: 0 }, "slow");
    });
  }

  productByshop() {
    const uuid = Math.floor(100000 + Math.random() * 900000);
    const newObject = [];
    this.cartCheckout.forEach(el => {
      if(Object.keys(newObject).findIndex(el2 => el.shopID == el2) === -1){
        const newGroup = el.shopID    
        newObject[newGroup] = [el] 
      } else {
        newObject[el.shopID].push(el)
      }
    });
    this.productbyShop = newObject;
    console.log(this.productbyShop);
  }

  initialLoadUserLogin() {
    this.UserLogin = this.account.UserLogin;
    if (this.UserLogin.id) { return; }
    this.account
      .getUserLogin(this.authen.getAuthenticated())
      .then(userLogin => (this.UserLogin = userLogin, 
        this.checkoutForm.patchValue(
          {user_id: userLogin.userID, fullname: userLogin.firstname + ' ' + userLogin.lastname,
           phone: userLogin.phone,
           email: userLogin.email,
           address: userLogin.address,
           }),
        console.log(this.checkoutForm.value
          )))
      .catch();
  }

  cartToCheckout() {
    if (localStorage.getItem('cart')) {
      this.cartCheckout = JSON.parse(localStorage.getItem('cart'));
    }
  }

  calTotal() {
    let sum = 0;
    for (let i = 0; i < this.cartCheckout.length; i++) {
      //console.log(i);
      sum += this.cartCheckout[i].total;

    }
    this.productTotal = sum;
  }

  addProductCartToCheckout(checkout: any) {
    this.cartCheckout.push({
      checkout
    })
  }

  removeCartItem(cartCheckout, i) {
    cartCheckout.splice(i, 1)
    localStorage.setItem('cart', JSON.stringify(cartCheckout));
    //console.log(cartItems)
    this.cartItemValue();
    this.calTotal();
  }

  cartValue = 0;
  cartItemValue() {
    if (localStorage.getItem('cart') != null) {
      var cartCount = JSON.parse(localStorage.getItem('cart'));
      //console.log(cartCount)
      this.cartValue = cartCount.length;
    }
  }



  genOrderID() {
    const uuid = Math.floor(100000 + Math.random() * 900000);
    this.orderNo = uuid;

  }
  checkCart() {
    console.log(this.checkoutForm.value)
  }

  plus(cartCheckout, i) {
    if (cartCheckout[i].qty != cartCheckout[i].stock) {
      cartCheckout[i].qty++;

      //console.log(i);
      //n.product[0].total = n.product[0].price * n.product[0].qty;
      cartCheckout[i].total = Math.round(cartCheckout[i].price) * (cartCheckout[i].qty.toFixed(2));

      this.productTotal = parseInt(this.cartCheckout[i].price) + this.productTotal;

      // + ค่าเข้าไปเก็บใน const แล้ว patchvalue ไปยัง Form Builder 
      let plusvalue = this.productTotal;
      this.checkoutForm.patchValue({ total: plusvalue });

      //
      //console.log(this.productTotal)
    }

    //n.product[0].qty ++;
    // const qty = i.product[0].qty++;
    // this.total = i.product[0].price * qty;
  }

  minus(cartCheckout, i) {
    if (cartCheckout[i].qty != 1) {
      cartCheckout[i].qty -= 1;

      //n.product[0].total = (n.product[0].price) * (n.product[0].qty);
      cartCheckout[i].total = Math.round(cartCheckout[i].price) * (cartCheckout[i].qty.toFixed(2));
      this.productTotal = this.productTotal - parseInt(this.cartCheckout[i].price);
      this.checkoutForm.patchValue({ total: this.productTotal });
    }
  }

  checkoutBtn() {
    if (!this.UserLogin.userID) {
       this.toastr.error('กรุณากรอกข้อมูลประเภทสินค้าที่ต้องการเพิ่มให้ครบ', 'เกิดข้อผิดพลาด !');
    }
     else {
    this.CrudService.postCheckout(this.checkoutForm.value).subscribe(
    );
    localStorage.removeItem('cart');
    //console.log(this.validateFrom.value)
    this.toastr.success('คำส่ั่งซื้อของคุณเข้าระบบ', 'สำเร็จ !');
    //setTimeout(location.reload.bind(location), 1000);
    //$('#addCategory').modal('hide');
    //window.location.reload();
    }
  }
}


