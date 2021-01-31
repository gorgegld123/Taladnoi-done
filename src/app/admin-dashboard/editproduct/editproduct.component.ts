import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Categorie } from 'src/app/components/products/shared/categorie.model';
import { Product } from 'src/app/components/products/shared/product.model';
import { CrudService } from 'src/app/components/services/crud.service';


declare const $: any;


@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {

  public model: any;
  validateFrom: FormGroup;
  selectedFile: File;
  categoryList: any[];
  product: any[];

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


  constructor(private CrudService: CrudService, private toastr: ToastrService, private fb: FormBuilder, private http: HttpClient) {
    this.validateFrom = fb.group({
      pname: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      cname: ['', Validators.required],
      detail: ['', Validators.required],
    });

    this.model = this.CrudService.updateProduct;
    //console.log(this.model)
    
    this.reload();


    // this.validateFrom.setValue(this.CrudService.updateProduct);
  }

  ngOnInit(): void {

    this.CrudService.getCategorie().subscribe(
      (categorie) => {
        this.categoryList = categorie;
      }
    );

    this.reload();
    
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
    formData.append('id', this.model.id);
    this.http.post('http://ta-lad-noi.com/taladnoiapi/edituploadimg.php', formData, {
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

  
  public onSubmit() {
    if (this.validateFrom.invalid) {
      this.toastr.error('กรุณากรอกข้อมูลสินค้าที่ต้องการเพิ่มให้ครบ', 'เกิดข้อผิดพลาด !');
    }
    else {
      this.onUpload();
      this.CrudService.editProduct(this.model.id, this.model).subscribe(
        result => {
          console.log(result);
        }
      );
      $('#editProduct').modal('hide');
      this.toastr.success('เพิ่มข้อมูลสินค้าเรียบร้อย', 'สำเร็จ !');
      setTimeout(location.reload.bind(location), 1000);
      //this.reload();

      //console.log(this.model);
      //console.log(this.validateFrom.value);
    }
  }

  reload() {
    this.CrudService.getProduct().subscribe((res) => {
      this.product = res;
    });
  }
  

}
