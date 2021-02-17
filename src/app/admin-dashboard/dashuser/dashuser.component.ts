import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CrudService } from 'src/app/components/services/crud.service';

@Component({
  selector: 'app-dashuser',
  templateUrl: './dashuser.component.html',
  styleUrls: ['./dashuser.component.css']
})
export class DashuserComponent implements OnInit {

  dtOptions2: DataTables.Settings = {};
  items: any;
  dtTrigger2: Subject<any> = new Subject<any>();

  constructor(private CrudService: CrudService) { }

  ngOnInit(): void {

    this.dtOptions2 = {
      pagingType: 'full_numbers',
      pageLength: 5
    };

    this.CrudService.getUser().subscribe(res => {
      this.items = res;
      this.dtTrigger2.next();
      console.log(this.items)
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger2.unsubscribe();
  }

  /** เมื่อมีการกดปุ่มแก้ไขของแถวนั้นๆ */
  onEditModal(person: any) {
    Object.assign(this.CrudService.updateUser, person);
    //this.CrudService.updateProduct.pname = p.pname;
    //console.log(p)
    console.log(this.CrudService.updateUser)
  }

}
