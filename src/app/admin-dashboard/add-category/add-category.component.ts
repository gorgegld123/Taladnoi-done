import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/components/services/crud.service';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { Product } from 'src/app/components/products/shared/product.model';
import { Categorie } from 'src/app/components/products/shared/categorie.model';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})


export class AddCategoryComponent implements OnInit {
  

  category : Categorie[];
  productinCat :any;

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.category, event.previousIndex, event.currentIndex);
  } 
    
  constructor(private CrudService: CrudService,) {
  }

  ngOnInit(): void {

    this.CrudService.getProductinCat().subscribe(
      (categories) => {
        console.log(categories)
        this.productinCat = categories;
      }
    );

  }

   /** เมื่อมีการกดปุ่มแก้ไขของแถวนั้นๆ */
   onEditModal(cat: any) {
    Object.assign(this.CrudService.updateCategories, cat);
    //this.CrudService.updateProduct.pname = p.pname;
    //console.log(p)
    console.log(this.CrudService.updateCategories)
  }

  public getSingleCat:any = Object.assign({});
  del(c){
    Object.assign(this.getSingleCat, c);
    Swal.fire({
      title: 'คุณแน่ใจแล้วใช่หรือไม่ ที่ต้องการประเภทสินค้านี้',
      icon: 'warning',
      showCancelButton: true,
      text: 'ประเภทสินค้าจะยังคงไม่ถูกลบออกจากระบบ หากมีรายการสินค้าอยู่ในประเภทนี้!',
      confirmButtonText: 'ใช่, ลบเลย!',
      cancelButtonText: 'ไม่, เก็บไว้ก่อน'
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title : 'ดำเนินการสำเร็จ!',
          icon: 'success',
          timer: 1000,
        }
        )
        this.CrudService.delCategory(this.getSingleCat.categoryID).subscribe();
        setTimeout(location.reload.bind(location), 1500);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'ยกเลิก!',
          'ประเภทสินค้ายังอยู่ในระบบ :)',
          'error'
        )
      }
    })
  }

}
