import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/components/services/crud.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Location } from '@angular/common';

@Component({
  selector: 'app-editshopdetailinfo',
  templateUrl: './editshopdetailinfo.component.html',
  styleUrls: ['./editshopdetailinfo.component.css']
})
export class EditshopdetailinfoComponent implements OnInit {

  id: number;
  bankInfo: any;
  bankName: any;
  validateFrom : FormGroup;

  constructor(private CrudService: CrudService, public route: ActivatedRoute , private fb:FormBuilder , private toastr:ToastrService , private location: Location) {
    
    this.validateFrom = fb.group({
      shopID: [null],
      bankID: ['', Validators.required],
      accName: ['', Validators.required],
      accNumber: ['', Validators.required],
      accBranch: ['', Validators.required],
      accType: ['', Validators.required],
    })
   }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')
    this.BankInfo(this.id);
    this.BankName();
  }

  BankInfo(id) {
    this.CrudService.getBankInfo(id).subscribe(
      (bank) => {
        //console.log(products);
        this.bankInfo = bank;
        //this.product = Array.of(products);
      }
    );
  }

  BankName() {
    this.CrudService.getBankName().subscribe(
      (res) => {
        this.bankName = res;
      }
    );
  }
  
  onSubmit(){
    this.validateFrom.patchValue({shopID : this.id})
    console.log(this.validateFrom.value);
    if (this.validateFrom.invalid) {
      this.toastr.error('กรุณากรอกข้อมูลสินค้าที่ต้องการเพิ่มให้ครบ', 'เกิดข้อผิดพลาด !');
    }
    else {
      this.CrudService.postBank(this.validateFrom.value).subscribe(
      );
      this.toastr.success('เพิ่มบัญชีสำหรับการชำระเงิน', 'สำเร็จ !');
      // this.validateFrom.reset();
      // setTimeout(location.reload.bind(location), 1000);
    }
  }

  public getSingleBankInfo:any = Object.assign({});
  del(value){
    Object.assign(this.getSingleBankInfo, value);
    Swal.fire({
      title: 'คุณแน่ใจแล้วใช่หรือไม่ ที่ต้องการลบบัญชีธนาคารนี้',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ใช่, ลบเลย!',
      cancelButtonText: 'ไม่, เก็บไว้ก่อน'
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title : 'สำเร็จ!',
          text: 'บัญชีธนาคารถูกลบออกจากระบบ',
          icon: 'success',
          timer: 1000,
        }
        )
        this.CrudService.delBankInfo(this.getSingleBankInfo.id).subscribe();
        setTimeout(location.reload.bind(location), 1500);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'ยกเลิก!',
          'บัญชีธนาคารนี้ยังคงอยู่ในระบบ :)',
          'error'
        )
      }
    })
  }

  back(){
    this.location.back();
  }

}
