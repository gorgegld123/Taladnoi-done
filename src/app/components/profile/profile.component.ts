import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { CrudService } from '../services/crud.service';
import { AuthenService } from '../services/loginservice/authen.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

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


}
