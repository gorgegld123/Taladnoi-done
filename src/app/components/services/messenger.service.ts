import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  CartProduct = new Subject();
  CartNumber = new Subject();
  CartCheckout = new Subject();
  CartTotal = new Subject();

  CartItem : any = new Subject<any>();
  UserLogin : any = new Subject<any>();

  constructor() { }

  sendMsg(product) {
    //console.log(product)
    this.CartProduct.next(Array.of(product));
    //this.subject.next(product)
  }

  getMsg() {
    return this.CartProduct.asObservable()
  }

  sendMsgCheckout(checkout) {
    this.CartItem.next(checkout);
  }

  getMsgCheckout() {
    return this.CartItem.asObservable()
  }

}
