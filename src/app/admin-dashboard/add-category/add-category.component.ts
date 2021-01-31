import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/components/services/crud.service';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { Product } from 'src/app/components/products/shared/product.model';
import { Categorie } from 'src/app/components/products/shared/categorie.model';


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

}
