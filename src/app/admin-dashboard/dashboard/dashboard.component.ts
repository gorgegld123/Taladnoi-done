import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { Subject } from 'rxjs';
import { AccountService } from 'src/app/components/services/account.service';
import { CrudService } from 'src/app/components/services/crud.service';
import { AuthenService } from 'src/app/components/services/loginservice/authen.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  UserLogin: any;
  orderList: any;
  Chart: any;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private account: AccountService, private authen: AuthenService, private CrudService: CrudService) { }

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };

    this.initialLoadUserLogin();

  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

  }

  initialLoadUserLogin() {
    this.UserLogin = this.account.UserLogin;
    if (this.UserLogin.id) { return; }
    this.account
      .getUserLogin(this.authen.getAuthenticated())
      .then(userLogin => (this.UserLogin = userLogin, this.queryOrderList(), this.queryChart()))
      .catch();
  }

  queryOrderList() {
    this.CrudService.getOrderlist(this.UserLogin.userID).subscribe(
      (order) => {
        //console.log(products);
        this.orderList = order;
        this.dtTrigger.next();
        console.log(this.orderList)
      }
    );
  }

  queryChart() {

    let month = [];
    let total = [];    

    this.CrudService.getChartValue(this.UserLogin.userID).subscribe(
      (chart) => {
        for (const dataObj of chart) {
          month.push(dataObj.Month);
          total.push(parseInt(dataObj.Total));
        }
        
    this.Chart = new Chart('payment', {
      type: 'bar',
        data: {
            labels: ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน" , "กรกฏาคม", "สิงหาคม", "กันยายน" ,"ตุลาคม", "พฤศจิกายน", "ธันวาคม"] ,
            datasets: [{
                label: "ยอดขาย",
                backgroundColor: "#4e73df",
                hoverBackgroundColor: "#2e59d9",
                borderColor: "#4e73df",
                data: total,
            }],
        },
        options: {
            maintainAspectRatio: false,
            layout: {
                padding: {
                    left: 10,
                    right: 5,
                    top: 5,
                    bottom: 0
                }
            },
            scales: {
                xAxes: [{
                    time: {
                        unit: 'month'
                    },
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        maxTicksLimit: 12
                    },
                }],
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: 10000,
                        maxTicksLimit: 15,
                        padding: 10,
                    },
                    gridLines: {
                        color: "rgb(234, 236, 244)",
                        zeroLineColor: "rgb(234, 236, 244)",
                        drawBorder: false,
                        borderDash: [2],
                        zeroLineBorderDash: [2]
                    }
                }],
            },
            legend: {
                display: false
            },
            tooltips: {
                titleMarginBottom: 10,
                titleFontColor: '#6e707e',
                titleFontSize: 14,
                backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#858796",
                borderColor: '#dddfeb',
                borderWidth: 1,
                xPadding: 15,
                yPadding: 15,
                displayColors: false,
                caretPadding: 10,
            },
        }
    });

      }
    );
  }

}
