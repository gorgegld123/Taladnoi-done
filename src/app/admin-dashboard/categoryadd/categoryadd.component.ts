import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/components/services/crud.service';

declare const $ : any;

@Component({
  selector: 'app-categoryadd',
  templateUrl: './categoryadd.component.html',
  styleUrls: ['./categoryadd.component.css']
})
export class CategoryaddComponent implements OnInit {

  categoryModel: any;
  validateFrom: FormGroup;
  categoryList: any;

  constructor(private CrudService: CrudService, private toastr: ToastrService, private fb: FormBuilder, private http: HttpClient) {
    this.validateFrom = fb.group({
      categoryName: ['', Validators.required],
      categoryCodename: ['', Validators.required],
      //time : new Date().toJSON().slice(0, 19).replace('T', ' ')
    });


  }

  ngOnInit(): void {
  }

  onSubmit() {

    if (this.validateFrom.invalid) {
      this.toastr.error('กรุณากรอกข้อมูลประเภทสินค้าที่ต้องการเพิ่มให้ครบ', 'เกิดข้อผิดพลาด !');
    }
    else {

      this.CrudService.postCategory(this.validateFrom.value).subscribe(
      );
      console.log(this.validateFrom.value)
      this.toastr.success('เพิ่มข้อมูลประเภทสินค้าเรียบร้อย', 'สำเร็จ !');
      setTimeout(location.reload.bind(location), 1000);
      $('#addCategory').modal('hide');
      //window.location.reload();
    }

  }
}
