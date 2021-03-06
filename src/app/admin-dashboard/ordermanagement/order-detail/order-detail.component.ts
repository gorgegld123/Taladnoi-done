import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Categorie } from 'src/app/components/products/shared/categorie.model';
import { CrudService } from 'src/app/components/services/crud.service';
import th from '@angular/common/locales/th';
import { registerLocaleData } from '@angular/common';

registerLocaleData(th);
declare const $: any;

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
  providers: [
    { provide: LOCALE_ID, useValue: "th" }, 
  ]
})


export class OrderDetailComponent implements OnInit {

  orderModel: any;
  validateFrom: FormGroup;
  categoryList: any;
  paymentID;
  productTotal :number = 0;

  editorStyle = {
    'height':'200px'
  }

  config = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
   
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
   
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
   
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
  
      ['link', 'image']                         // link and image, video
    ],
  }

  constructor(private CrudService: CrudService, private toastr: ToastrService, private fb: FormBuilder, private http: HttpClient) {
    
    this.orderModel = this.CrudService.updateOrder;
    
    
  }

  ngOnInit(): void {

    this.genPaymentID();
    this.calTotal();
    this.CrudService.getCategorie().subscribe(
      (categorie) => {
        this.categoryList = categorie;
      }
    );

    this.validateFrom = this.fb.group({
      payment_id:[this.paymentID],
      order_id:['', Validators.required],
      order_status: ['', Validators.required],
      pay_money: ['' ,Validators.required],
      pay_date: ['' , Validators.required],
      detail: ['', Validators.required]
    });
  }

  calTotal(){
    console.log(this.orderModel)
  // let sum = 0;
  // for (let i = 0; i < this.orderModel.product.length; i++) {
  // sum += parseInt(this.orderModel.product[i].total);
  // }
  //       this.productTotal = sum;
   }
  
   getTotal(total) {
    let sum = 0     
    sum = total.reduce((acc, {total}) => acc += +(total || 0), 0 );
    this.productTotal = sum;
    //this.validateFrom.patchValue({pay_money: this.productTotal })
  }
 
 
  genPaymentID() {
    const uuid = Math.floor(100000 + Math.random() * 900000);
    this.paymentID = uuid;

  }
  
  url = './assets/img/thumbnail.jpg';
  selectedFile : File;

  onFileChanged(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event:any) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
      this.selectedFile = event.target.files[0];
      //console.log(this.selectedFile);
    }
  }

  onUpload() {
    const formData = new FormData();
    formData.append('files', this.selectedFile , this.selectedFile.name);
    this.http.post('http://ta-lad-noi.com/taladnoiapi/uploadpaymentorder.php', formData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(res => {
      if (res.type === HttpEventType.UploadProgress) {
        console.log(res);
        console.log('Upload : ' + Math.round(res.loaded / res.total * 100) + '%')
      } else if (res.type === HttpEventType.Response) {
        console.log(res);
      }
    }, (err) => { });
  }

  async onSubmit() {
     this.validateFrom.patchValue({order_id: this.orderModel.orderNo })
    // console.log(this.validateFrom.value);
    // if (this.validateFrom.invalid) {
    //   await this.toastr.error('กรุณากรอกข้อมูลที่ต้องการแก้ไข', 'เกิดข้อผิดพลาด !');
    // }
    // else {
      //await this.onUpload();
      await this.CrudService.postPayment(this.validateFrom.value).subscribe(
      );
      await this.toastr.success('การดำเนินการเรียบร้อย', 'สำเร็จ !');
      setTimeout(location.reload.bind(location), 1000);
      await console.log(this.validateFrom.value);
    }

    
    
  //}
  
  
}
