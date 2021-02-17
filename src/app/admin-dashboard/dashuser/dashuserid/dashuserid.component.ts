import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from 'src/app/components/services/crud.service';
import { UserService } from 'src/app/components/services/user.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-dashuserid',
  templateUrl: './dashuserid.component.html',
  styleUrls: ['./dashuserid.component.css'],
  providers : [UserService]
})
export class DashuseridComponent implements OnInit {

  form : FormGroup;
  userModel: any;

  constructor(private CrudService:CrudService , private fb:FormBuilder , private user:UserService) { 
    
    this.userModel = this.CrudService.updateUser;

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

  ngOnInit(): void {

  }

  submit(){
    this.form.patchValue({username : this.userModel.username , user_statusID : '1' , position : this.userModel.position , address : this.userModel.address})
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
          .updateMember(this.userModel.userID, this.form.value)
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
