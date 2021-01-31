import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { CrudService } from '../../services/crud.service';
import { AuthenService } from '../../services/loginservice/authen.service';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {

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
      .then(userLogin => (this.UserLogin = userLogin))
      .catch();
  }

}
