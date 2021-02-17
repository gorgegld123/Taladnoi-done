import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { CrudService } from '../../services/crud.service';
import { AuthenService } from '../../services/loginservice/authen.service';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css'],
  providers: [
    UserService]
})
export class ProfileDetailComponent implements OnInit {

  orderList: any;
  panelExpended: boolean = false;
  UserLogin: any;
  productTotal: number;
  form : FormGroup;
  constructor(private CrudService: CrudService, private account: AccountService, private authen: AuthenService , private fb:FormBuilder , private user:UserService) { }


  ngOnInit(): void {
    this.initialLoadUserLogin();
    //this.calTotal();

      this.form = this.fb.group({
        username: [null,Validators.required],
        password: [''],
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        position: ['', Validators.required],
        email:[''],
        phone:[''],
        address:[''],
        user_statusID:[''],
        image: []
      });
  

  }

  initialLoadUserLogin() {
    this.UserLogin = this.account.UserLogin;
    if (this.UserLogin.id) { return; }
    this.account
      .getUserLogin(this.authen.getAuthenticated())
      .then(userLogin => (this.UserLogin = userLogin))
      .catch();
      console.log(this.UserLogin);
      
  }


  submit(){
    this.form.patchValue({username : this.UserLogin.username , user_statusID : '1' , position : this.UserLogin.position})
    Swal.fire({
      title: 'คุณแน่ใจแล้วใช่หรือไม่ ที่ต้องการแก้ไขข้อมูล',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ใช่!',
      cancelButtonText: 'ไม่'
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title : 'สำเร็จ!',
          text: 'แก้ไขข้อมูลเรียบร้อยแล้ว',
          icon: 'success',
          timer: 1000,
        }
        )
        this.user
          .updateMember(this.UserLogin.userID, this.form.value)
          .then(res => {
            console.log(res);      
          })
          .catch(err => alert('ผิดพลาด'));
          console.log(this.form.value);
        setTimeout(location.reload.bind(location), 1500);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'ยกเลิก!',
          'ข้อมูลทุกอย่างยังคงเหมือนเดิม :)',
          'error'
        )
      }
    })
    
  };
}
