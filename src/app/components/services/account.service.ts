import { HttpService } from './loginservice/http.service';
import { ILogin } from '../login/login.interface';
import { Injectable, resolveForwardRef } from '@angular/core';
import { IRegister } from '../register/register.interface';


@Injectable()
export class AccountService {
  constructor(private http: HttpService) { }

  // store user login ไว้
  public UserLogin: IAccount = {} as any;
  public setUserLogin(userLogin: IAccount) {
    this.UserLogin.userID = userLogin.userID;
    this.UserLogin.firstname = userLogin.firstname;
    this.UserLogin.lastname = userLogin.lastname;
    this.UserLogin.username = userLogin.username;
    this.UserLogin.password = userLogin.password;
    this.UserLogin.gender = userLogin.gender;
    this.UserLogin.email = userLogin.email;
    this.UserLogin.phone = userLogin.phone;
    this.UserLogin.address = userLogin.address;
    this.UserLogin.postcode = userLogin.postcode;
    this.UserLogin.image = userLogin.image;
    this.UserLogin.position = userLogin.position;
    this.UserLogin.created = userLogin.created;
    this.UserLogin.update = userLogin.update;
    this.UserLogin.shopID = userLogin.userID;
    return this.UserLogin;
  }



  // ดึงข้อมูลผู้ที่เข้าสู่ระบบจาก token
  getUserLogin(accessToken: string) {
    return (this.http.requestGet('api/user/data', accessToken).toPromise() as Promise<IAccount>)
      .then(userLogin => this.setUserLogin(userLogin));
  }

  // เข้าสู่ระบบ
  onLogin(model: ILogin) {
    return this.http.requestPost('api/account/login', model).toPromise() as Promise<{ accessToken: string }>;
  }

  // สมัครสมาชิก
  onRegister(model: IRegister) {
    return this.http.requestPost('api/account/register', model).toPromise() as Promise<IAccount>;
  }

}

export interface IAccount {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  gender: string;
  email: string;
  phone: string;
  address: string;
  postcode: string;
  userID?: any;
  user_statusID: string;
  position?: string;
  image?: string;
  created?: Date;
  update?: Date;
  shopID?: string;
}
