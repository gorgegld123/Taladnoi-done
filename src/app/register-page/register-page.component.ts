

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Toast, ToastrService } from 'ngx-toastr';
import { AccountService } from '../components/services/account.service';
import { ValidatorsService } from '../components/services/loginservice/validators.service';
import { IRegisterComponent } from '../components/register/register.interface';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit, IRegisterComponent {

  constructor(
    private builder: FormBuilder,
    private account: AccountService,
    private router: Router,
    private validators: ValidatorsService,
    private toastr : ToastrService
    
    ){}
    loginForm: FormGroup;
    registerForm: FormGroup;
  
    ngOnInit(): void {
    
      this.registerForm = this.builder.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required, this.validators.isPassword]],
        cpassword: ['', [Validators.required, this.validators.comparePassword('password')]],
        firstname: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
       /*  identification: ['', [Validators.required]],
        email: ['', [Validators.required]],
        phone: ['', [Validators.required]],
        postcode: ['', [Validators.required]],
        address: ['', [Validators.required]] */
      });
     
    this.loginForm = this.builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  // สมัครสมาชิก
  onSubmit() {
      if (this.registerForm.invalid) {
        return this.toastr.error('ไม่สำเร็จ', 'ไม่สำเร็จสำเร็จ !');
      }
      else {
      // ส่งข้อมูลเข้า server
      this.account
          .onRegister(this.registerForm.value)
          .then(res => {
            this.toastr.success('Success', 'สำเร็จ !');
          })
          .catch();
      }
  }

}
