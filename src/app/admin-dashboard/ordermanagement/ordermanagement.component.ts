import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { CrudService } from 'src/app/components/services/crud.service';
import th from '@angular/common/locales/th';
import { registerLocaleData } from '@angular/common';
import { AccountService } from 'src/app/components/services/account.service';
import { AuthenService } from 'src/app/components/services/loginservice/authen.service';
registerLocaleData(th);


@Component({
  selector: 'app-ordermanagement',
  templateUrl: './ordermanagement.component.html',
  styleUrls: ['./ordermanagement.component.css'],
  providers: [
    { provide: LOCALE_ID, useValue: "th" },
  ]
})
export class OrdermanagementComponent implements OnInit {


  orderList: any;
  panelExpended: boolean = false;
  UserLogin: any;
  productTotal: number;
  constructor(private CrudService: CrudService, private account: AccountService, private authen: AuthenService) { }

  ngOnInit(): void {
    this.initialLoadUserLogin();
    //this.calTotal();

  }

  initialLoadUserLogin() {
    this.UserLogin = this.account.UserLogin;
    if (this.UserLogin.id) { return; }
    this.account
      .getUserLogin(this.authen.getAuthenticated())
      .then(userLogin => (this.UserLogin = userLogin, this.queryOrderList()))
      .catch();
  }

  queryOrderList() {
    this.CrudService.getOrderlist(this.UserLogin.userID).subscribe(
      (order) => {
        //console.log(products);
        this.orderList = order;
        console.log(this.orderList)
        let sum = 0;
        for (let i = 0; i < this.orderList.length; i++) {
          //console.log(i)
          for (let b = 0; b < this.orderList[i].product.length; b++) {
            sum += parseInt(this.orderList[i].product[b].total);
          }
        }
        this.productTotal = sum;
      }
    );
  }

 
  getTotal(total) {
    return total.reduce((acc, {total}) => acc += +(total || 0), 0 );
  }
  
  // same getTotal but เขียนเยอะกว่าชิบหาย
  // getTotal(marks) {
  //   let total = 0;
  //   marks.forEach((item) => {
  //     total += Number(item.total);
  //   });
  //   console.log(total)
  //   return total;
  // }

  calTotal() {
    this.orderList.map(value => value)
    console.log(this.orderList);
  }

  onEditModal(item) {
    Object.assign(this.CrudService.updateOrder, item);
    console.log(item)
  }

}
