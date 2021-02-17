import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILoginComponent } from './login.interface';
import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import { AccountService } from '../services/account.service';
import { AuthenService } from '../services/loginservice/authen.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements ILoginComponent {

  constructor(
    private builder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private account: AccountService,
    private authen: AuthenService,
    private location: Location,
    private toastr:ToastrService
  ) {
    this.initialCreateFormData();
   }

  form: FormGroup;

  // เข้าสู่ระบบ
  onSubmit(): void {
    if (this.form.invalid)
    this.toastr.error('กรุณากรอกข้อมูล', 'ผิดพลาด !');
      // return this.messageService.add({severity: 'warn', summary: 'Warn', detail: 'ข้อมูลบางอย่างผิดพลาด'});

    this.account.onLogin(this.form.value)
                .then(res => {
                  // เก็บ session
                  this.authen.setAuthenticated(res.accessToken);
                  this.toastr.success('เข้าสู่ระบบสำเร็จ', 'สำเร็จ !');
                  // redirect หน้า page
                  /* this.router.navigate(['/home']); */
                  this.location.back();
                })
                .catch(err => this.toastr.error('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง', 'ผิดพลาด !'));
              }

  // สร้างฟอร์ม
  private initialCreateFormData(){
    this.form = this.builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
