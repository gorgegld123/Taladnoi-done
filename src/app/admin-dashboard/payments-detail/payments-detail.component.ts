import { Component, OnInit } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';
import { AccountService } from 'src/app/components/services/account.service';
import { CrudService } from 'src/app/components/services/crud.service';
import { AuthenService } from 'src/app/components/services/loginservice/authen.service';

@Component({
  selector: 'app-payments-detail',
  templateUrl: './payments-detail.component.html',
  styleUrls: ['./payments-detail.component.css']
})
export class PaymentsDetailComponent implements OnInit {

  paymentsList: any;
  showModal: boolean;

  UserLogin: any;
  constructor(private CrudService: CrudService, private account: AccountService, private authen: AuthenService) {
  }

  ngOnInit(): void {
    this.initialLoadUserLogin();

  }

  initialLoadUserLogin() {
    this.UserLogin = this.account.UserLogin;
    if (this.UserLogin.id) { return; }
    this.account
      .getUserLogin(this.authen.getAuthenticated())
      .then(userLogin => (this.UserLogin = userLogin, this.queryPaymentsList()))
      .catch();
  }

  queryPaymentsList() {
    this.CrudService.getPaymentsList(this.UserLogin.userID).subscribe(
      (payments) => {
        this.paymentsList = payments;
        console.log(this.paymentsList);
      });
  }

  public productDetail:any = Object.assign({});
  show(p)
  {
    this.showModal = true; // Show-Hide Modal Check
    Object.assign(this.productDetail, p);
    console.log(this.productDetail);
    
    
  }
  //Bootstrap Modal Close event
  hide()
  {
    this.showModal = false;
  }


}