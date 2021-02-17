import { Injectable } from "@angular/core";

import { AccountService, IAccount } from "./account.service";
import { AuthenService } from "./loginservice/authen.service";
import { HttpService } from "./loginservice/http.service";

declare let $;

@Injectable()
export class UserService {
  constructor(
    private account: AccountService,
    private http: HttpService,
    private authen: AuthenService
    ){
  }

  // // ดึงข้อมูลสมาชิก
  // getMember(options?: IDashmemberSearch) {
  //   return this.http
  //           .requestGet(`api/user?${$.param(options)}`, this.authen.getAuthenticated())
  //           .toPromise() as Promise<IMember>;
  // }

  // เพิ่มข้อมูลสมาชิก
  createMember(model: IAccount) {
    return this.http.requestPost('api/user', model, this.authen.getAuthenticated())
    .toPromise() as Promise<IAccount>;
  }

  // แก้ไขข้อมูลสมาชิก
  updateMember(id: any, model: any) {
    return this.http.requestPut('api/user/' + id , model , this.authen.getAuthenticated())
    .toPromise() as Promise<IAccount>;
  }


  // ดึงข้อมูลสมาชิกแค่คนเดียว
  getMemberById(id) {
   return this.http.requestGet(`api/uesr/${id}`, this.authen.getAuthenticated())
   .toPromise() as Promise<IAccount>
  }

}
