import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Categorie } from './shared/categorie.model';
import { Product } from './shared/product.model';
import { SelectItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { CrudService } from '../services/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MessengerService } from '../services/messenger.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {


  selectedCity: Categorie[];
  selectedCountries: any[];

  CloseResult = '';
  id: number;
  categorie$: any[];
  category = '';
  searchFilters: string;
  product: any;
  categoryFilters = '';
  SortPrice = 'ซึลกิ';
  shopDetail : any;

  prod: any;
  @Input() productDetail: Product[];

  testapi: any;


  addtoCart: any;

  imageDirectoryPath = 'http://ta-lad-noi.com/taladnoiapi/productImage/';

  constructor(private CrudService: CrudService, private modalService: NgbModal, private route: ActivatedRoute, private toastr: ToastrService,
    private msg: MessengerService, private router: Router ,private spinner:NgxSpinnerService) { }


  ngOnInit() {

    this.spinner.show();
 
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);

    //this.onSortPrice();
    this.id = +this.route.snapshot.paramMap.get('shopID');
    this.ProductInShop(this.id);
    this.ShopDetail(this.id);



    this.CrudService.getCategorie().subscribe(
      (categorie) => {
        //console.log(categorie)
        this.categorie$ = categorie;
        console.log(this.categoryFilters)
      }
    );
    // this.testMethod();

  }

  viewDetail(p) {
    Object.assign(this.CrudService.productDetail, p);
    console.log(this.CrudService.productDetail)
  }

  // Pipes Sort 
  onSortPrice() {
    if (this.SortPrice === 'ซึลกิ') {
      this.SortPrice = 'ไอยู 55';
    } else {
      this.SortPrice = 'ซึลกิ';
    }
    console.log(this.SortPrice)
  }


  ProductInShop(id) {
    this.CrudService.getProductInshop(id).subscribe(
      (products) => {
        //console.log(products);
        this.product = products;
        //this.product = Array.of(products);
        console.log(this.product)
      }
    );
  }


  ShopDetail(id) {
    this.CrudService.getShopDetail(id).subscribe(
      (shop) => {
        //console.log(products);
        this.shopDetail = shop;
        //this.product = Array.of(products);
        console.log(this.shopDetail)
      }
    );
  }


  get productFilter() {
    return this.product ?
      this.product.filter((search) =>
        this.searchFilters ?
          search.pname.toLowerCase().match(this.searchFilters) : search)
      : this.product;
  }


  open(content) {
    this.modalService.open(content, { size: 'lg', backdrop: 'static', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.CloseResult = `Closed with: ${result}`;
    });
  }

  onAddtoCart(p: Product) {
    Object.assign(this.CrudService.addtoCart, p);
    //this.CrudService.updateProduct.pname = p.pname;
    //console.log(p)
    this.addtoCart = this.CrudService.addtoCart;
    this.toastr.success('เพิ่มสินค้าเข้าตะกร้าสินค้า', 'สำเร็จ !');
    //this.handleAddtoCart(p);
  }

  handleAddtoCart(p: any) {
    p.qty = "1";
    p.total = parseInt(p.price);
    this.msg.sendMsg(p);
    this.toastr.success('เพิ่มสินค้าเข้าตะกร้าสินค้า', 'สำเร็จ !');
    //console.log(p)
  }

  itemCart: any[];
  addToCart(prod) {
    //console.log(prod);
    prod.qty = "1";
    prod.total = parseInt(prod.price);
    let cartDataNull = localStorage.getItem('cart');
    if (cartDataNull == null) {
      let storeDataGet: any = [];
      storeDataGet.push(prod);
      localStorage.setItem('cart', JSON.stringify(storeDataGet));
    }
    else {
      var id = prod.id;
      //let index:number = -1;
      let checkExists: boolean = false;
      this.itemCart = JSON.parse(localStorage.getItem('cart'));
      for (var i = 0; i < this.itemCart.length; i++) {
        if (id == this.itemCart[i].id) {
          checkExists = true;
          this.toastr.error('มีสินค้านี้อยู่ในตะกร้าสินค้าแล้ว', 'ผิดพลาด !');
        }
      }
      if (checkExists == false) {
        this.itemCart.push(prod);
        localStorage.setItem('cart', JSON.stringify(this.itemCart));
        this.toastr.success('เพิ่มสินค้าเข้าตะกร้าสินค้า', 'สำเร็จ !');
      } else {
        localStorage.setItem('cart', JSON.stringify(this.itemCart));
        //this.msg.sendMsg(this.itemCart);
      }
    }
    this.calTotal();
    this.cartNumberFuc();
    this.cartItFuc();
  }

  productTotal: number;
  calTotal() {
    let sum = 0;
    for (let i = 0; i < this.itemCart.length; i++) {
      //console.log(i);
      sum += this.itemCart[i].total;

    }
    this.productTotal = sum;
    this.msg.CartTotal.next(this.productTotal)
  }

  cartIt: any = [];
  cartItFuc() {
    var CartIt1 = JSON.parse(localStorage.getItem('cart'));
    this.cartIt = CartIt1;
    this.msg.CartProduct.next(this.cartIt);
  }

  cartNumber: number = 0;
  cartNumberFuc() {
    var cartCount = JSON.parse(localStorage.getItem('cart'));
    this.cartNumber = cartCount.length;
    this.msg.CartNumber.next(this.cartNumber)
    //console.log(this.cartNumber)
  }

 
  shopdetailAssign(s){
    Object.assign(this.CrudService.shopInfo, s);
    console.log(s)
  }

  // testMethod() {
  //   this.CrudService.test().subscribe(
  //     (products2) => {
  //       //console.log(products);
  //       this.testapi = products2;
  //       console.log(this.testapi)
  //     }
  //   )
  // };
}
