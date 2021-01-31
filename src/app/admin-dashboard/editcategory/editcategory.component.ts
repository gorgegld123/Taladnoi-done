import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Categorie } from 'src/app/components/products/shared/categorie.model';
import { CrudService } from 'src/app/components/services/crud.service';

declare const $: any;

@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.css']
})
export class EditcategoryComponent implements OnInit {



  catModel: any;
  validateFrom: FormGroup;
  categoryList: any;

  constructor(private CrudService: CrudService, private toastr: ToastrService, private fb: FormBuilder, private http: HttpClient) {
    this.validateFrom = fb.group({
      categoryName: [''],
      categoryCodename: [''],
      cname: ['' , Validators.required]
    });
  
    this.catModel = this.CrudService.updateCategories;
    
  }

  ngOnInit(): void {


    this.CrudService.getCategorie().subscribe(
      (categorie) => {
        this.categoryList = categorie;
      }
    );
  }

  public onSubmit() {
    if (this.validateFrom.invalid) {
      this.toastr.error('กรุณากรอกข้อมูลที่ต้องการแก้ไข', 'เกิดข้อผิดพลาด !');
    }
    else {
      this.CrudService.editCategories(this.catModel.categoryID, this.catModel).subscribe(
        result => {
          console.log(result);
        }
      );
      setTimeout(location.reload.bind(location), 1000);
      $('#editCategory').modal('hide');
      this.toastr.success('แก้ไขข้อมูลเรียบร้อย', 'สำเร็จ !');
    
      //this.reload();

      //console.log(this.model);
      //console.log(this.validateFrom.value);
    }
  }

 

}
