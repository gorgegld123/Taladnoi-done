import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie } from '../products/shared/categorie.model';
import { Product } from '../products/shared/product.model';
import { map } from 'rxjs/operators';
import { Category } from '../products/shared/productincat.model';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  public url = 'http://ta-lad-noi.com/taladnoiapi/';
  public url2 ='https://projectprofessorhon.000webhostapp.com/homestay_api/'
  public updateProduct:Product = Object.assign({});
  public addtoCart:Product = Object.assign({});
  public updateCategories:Category = Object.assign({});
  public updateOrder:any = Object.assign({});
  public checkout:any = Object.assign({});
  public productDetail:any = Object.assign({});

  constructor(private http: HttpClient) { }

  test(): Observable<any> {
    return this.http.get<any>(this.url2 + 'api_getRoomAdmin.php')
  }

  getShoplist(): Observable<any> {
    return this.http.get<any>(this.url + 'getshoplist.php')
  }

  getOrderlist(value : any): Observable<any> {
    return this.http.post<any>(this.url + 'ordermanagement.php' , value)
  }

  getOrderUser(value : any): Observable<any> {
    return this.http.post<any>(this.url + 'order_detail.php' , value)
  }

  getPaymentsList(value :any) : Observable<any> {
    return this.http.post<any>(this.url + 'get_payment.php' , value)
  }

  getOrderlist2(): Observable<any> {
    return this.http.get<any>(this.url + 'order_detail.php')
  }

  getProductInshop(id): Observable<any> {
    return this.http.get<any>(this.url + 'get_product_inshop.php?id=' + id)
  }

  getProduct(): Observable<Product []> {
    return this.http.get<Product []>(this.url + 'get_product_api.php')
  }

  getProductViaSession(value: any): Observable<any> {
    return this.http.post<any>(this.url + 'product_by_user.php', value);
  }
  // Get single product
  getProductDetails(id): Observable<any> {
    return this.http.get<any>(this.url + 'get_productdetail_api.php?id=' + id)
  }

  getCategorie() : Observable<Categorie[]>{ 
    return this.http.get<Categorie[]>(this.url + 'get_productcat_api.php');
  }

  postProduct(value: Product) {
    return this.http.post(this.url + 'createproduct.php' , value);
  }

  editProduct(id: any , value: Product){
    return this.http.put(this.url + 'updateproduct.php' ,value , { params: {id:id}});
  }
  editCategories(id: any , value: Category){
    return this.http.put(this.url + 'updatecategory.php' ,value , { params: {id:id}});
  }
  
  getProductinCat(): Observable<any> {
    return this.http.get<any>(this.url + 'productincat.php');
  }

  postCategory(value: Categorie) {
    return this.http.post(this.url + 'createcategory.php' ,value);
  }

  postCheckout(value: any) {
    return this.http.post(this.url + 'insertorder.php' ,value)
  }

  postPayment(value: any) {
    return this.http.post(this.url + 'insertpayment.php' ,value)
  }

  delOrders(value : any) {
    return this.http.post(this.url + 'user_cancelorder.php' , value)
  }

}
