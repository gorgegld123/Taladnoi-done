import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-shopinfo',
  templateUrl: './shopinfo.component.html',
  styleUrls: ['./shopinfo.component.css']
})
export class ShopinfoComponent implements OnInit {

  id: number;
  shopInfo: any;
  bankInfo: any;
  constructor(private CrudService: CrudService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = + this.route.snapshot.paramMap.get('shopID');
    // this.shopInfo = this.CrudService.shopInfo
    // console.log(this.shopInfo);
    this.shopDetail(this.id);
    this.BankInfo(this.id);
  }

  shopDetail(id) {
    this.CrudService.getShopDetail(id).subscribe(
      (shop) => {
        //console.log(products);
        this.shopInfo = shop;
        console.log(this.shopInfo);

      }
    );
  }

  BankInfo(id) {
    this.CrudService.getBankInfo(id).subscribe(
      (bank) => {
        //console.log(products);
        this.bankInfo = bank;
        console.log(this.bankInfo);
        
      }
    );
  }
}
