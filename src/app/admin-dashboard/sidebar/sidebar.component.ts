import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/components/services/account.service';
import { AuthenService } from 'src/app/components/services/loginservice/authen.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {


  UserLogin: any;
  constructor(private account: AccountService, private authen: AuthenService) { }

  ngOnInit(): void {
    this.UserLogin = this.account.UserLogin;
    if (this.UserLogin.id) { return; }
    this.account
      .getUserLogin(this.authen.getAuthenticated())
      .then(userLogin => (this.UserLogin = userLogin))
      .catch();
    console.log(this.UserLogin)
  }
}

