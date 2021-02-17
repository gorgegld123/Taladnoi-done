import { HttpClient, HttpClientModule, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/components/services/account.service';
import { CrudService } from 'src/app/components/services/crud.service';
import { AuthenService } from 'src/app/components/services/loginservice/authen.service';

@Component({
  selector: 'app-editshopdetail',
  templateUrl: './editshopdetail.component.html',
  styleUrls: ['./editshopdetail.component.css']
})
export class EditshopdetailComponent implements OnInit {


  editorStyle = {
    height: '200px',
    backgroundColor: '#ffffff'
  }

  config = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
   
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
   
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
   
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
   
      ['clean'],                                         // remove formatting button
   
      ['link', 'image', 'video']                         // link and image, video
    ]
  }
  UserLogin : any;
  shopDetail : any;
  validateForm : FormGroup;
  selectedFile : File;
  constructor(private authen : AuthenService , private account:AccountService , private CrudService:CrudService , private fb:FormBuilder , private http:HttpClient,private toastr:ToastrService) {

    this.validateForm = fb.group({
      shopID: [''],
      shop_name: ['', Validators.required],
      shop_detail: ['', Validators.required],
      shop_address: [''],
      shop_line: [''],
      shop_msg: [''],
      shop_phone: [''],
      shopstatus_ID: ['']
    });

  
  }

  ngOnInit(): void {
    
    this.initialLoadUserLogin();
    
  }

  initialLoadUserLogin() {
    this.UserLogin = this.account.UserLogin;
    if (this.UserLogin.id) { return; }
    this.account
      .getUserLogin(this.authen.getAuthenticated())
      .then(userLogin => (this.UserLogin = userLogin,
        this.shopDetailByID()))
      .catch();  
      
  }

  shopDetailByID() {
    this.CrudService.getShopDetailBanckend(this.UserLogin.userID).subscribe((res) => {
      this.shopDetail = res;
      console.log(this.shopDetail);
    })
  }

  url = '';

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
    formData.append('files', this.selectedFile);
    formData.append('id', this.shopDetail.shopID);
    this.http.post('http://ta-lad-noi.com/taladnoiapi/editshopimg.php', formData, {
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

  onSubmit(){
    if (this.validateForm.invalid) {
      this.toastr.error('กรุณากรอกข้อมูลสินค้าที่ต้องการเพิ่มให้ครบ', 'เกิดข้อผิดพลาด !');
    }
    else {
      this.onUpload();
      this.validateForm.patchValue({shopID : this.shopDetail[0].shopID})
      this.CrudService.editShopDetail(this.shopDetail[0].shopID, this.validateForm.value).subscribe(
        result => {
          console.log(result);
        }
      );
      this.toastr.success('แก้ไขข้อมูลร้านค้าเรียบร้อย', 'สำเร็จ !');
      setTimeout(location.reload.bind(location), 1000);
      //this.reload();

      //console.log(this.model);
      console.log(this.validateForm.value);

    }
  }

  test(){
    console.log(this.shopDetail);
  }
}
