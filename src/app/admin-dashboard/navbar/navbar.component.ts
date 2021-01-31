import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/components/services/account.service';
import { CrudService } from 'src/app/components/services/crud.service';
import { AuthenService } from 'src/app/components/services/loginservice/authen.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private CrudService: CrudService, private authen:AuthenService , private account:AccountService , private router:Router) { }

  ngOnInit(): void {
    this.initialLoadUserLogin();
  }

  
  UserLogin : any;
  initialLoadUserLogin() {
    this.UserLogin = this.account.UserLogin;
    if (this.UserLogin.id) { return; }
    this.account
        .getUserLogin(this.authen.getAuthenticated())
        .then(userLogin => this.UserLogin = userLogin )
        .catch();     
    console.log(this.UserLogin)
  }

}
