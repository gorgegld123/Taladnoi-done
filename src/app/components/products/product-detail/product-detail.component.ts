import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../../services/crud.service';
import { Observable} from 'rxjs';
import { Product } from '../shared/product.model';
import { MessengerService} from '../../services/messenger.service'
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  id: number;
  productDetail : any;

  constructor(private toastr: ToastrService ,private route: ActivatedRoute , private CrudService: CrudService , private msg : MessengerService ) { }

  ngOnInit(): void {
    // this.id = +this.route.snapshot.paramMap.get('id');
    // this.getDetail(this.id);

    this.productDetail = this.CrudService.productDetail;

  }

  handleAddtoCart () {
    this.msg.sendMsg(this.productDetail);
    //console.log(this.productDetail)
    this.toastr.success('เพิ่มสินค้าเข้าตะกร้าสินค้า', 'สำเร็จ !');
  }

  onAddtoCart(p: Product) {
    Object.assign(this.CrudService.addtoCart, p);
    //this.CrudService.updateProduct.pname = p.pname;
    //console.log(p)
    console.log(this.CrudService.addtoCart)
    this.toastr.success('เพิ่มสินค้าเข้าตะกร้าสินค้า', 'สำเร็จ !');
  }

  getDetail(id) {
  this.CrudService.getProductDetails(id).subscribe(
    (productdetail) => {
      console.log(productdetail);
      this.productDetail = Array.of(productdetail);
    }
  );
  }

}
