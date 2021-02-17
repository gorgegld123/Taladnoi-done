import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { NgxSpinnerService } from "ngx-spinner";
declare const $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  Shoplist: any;

  slides = [
    {img: "https://paikondieow.com/wp-content/uploads/2019/02/2.jpg"},
    {img: "https://paikondieow.com/wp-content/uploads/2019/02/7.jpg"},
    {img: "https://static.bkkmenu.com/files/2018/08/Taladnoi-7019816-1005x670.JPG"}
  ];

  slideConfig2 = {
  "slidesToShow": 1, 
  "slidesToScroll": 1,
  "arrows": false ,
  "speed": 2000, 
  "autoplaySpeed" :5000,
  "autoplay": true,
  "fade": true,
  "infinite": true,
  "cssEase": 'cubic-bezier(0.7, 0, 0.3, 1)',
  "touchThreshold": 100,
};
  


  slideConfig = {
    "speed": 6000,
    "autoplay": true,
    "autoplaySpeed": 0,
    "cssEase": 'linear',
    "slidesToShow": 4,
    "slidesToScroll": 1,
    "arrows": false,
    "infinite": true,
    "centerMode": false,
    "focusOnSelect": false,
    "responsive": [
      {
        "breakpoint": 1024,
        "settings": {
            "slidesToShow": 2,
            "slidesToScroll": 1
        }
      },
      {
        "breakpoint": 600,
        "settings": {
            "slidesToShow": 2,
            "slidesToScroll": 1
        }
      },
      {
        "breakpoint": 768,
        "settings": {
            "slidesToShow": 2,
            "slidesToScroll": 1
        }
      },
      {
        "breakpoint": 480,
        "settings": {
            "verticalSwiping": true,
            "vertical": true,
            "slidesToShow": 1,
            "slidesToScroll": 1,
            "speed": 3000,
        }
      }
    ]
  };

  storeDataGet: any = [];

  constructor(private CrudService: CrudService
  ,private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
 
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1500);
    
    let cartDataNull = localStorage.getItem('cart');
    if (cartDataNull == null) {
      let storeDataGet: any = [];
      storeDataGet.push();
      localStorage.setItem('cart', JSON.stringify(storeDataGet));
    }

    $('#myCarousel').carousel({
      interval: 5000,
    })

    this.CrudService.getShoplist().subscribe(
      (shoplist) => {
        //console.log(products);
        this.Shoplist = shoplist;
        //this.product = Array.of(products);
        console.log(this.Shoplist)
      }
    );
  }

  slickInit(e) {
    console.log('slick initialized');
  }

  anchorShoplist() {
    document.getElementById("shoplist").scrollIntoView({ behavior: "smooth" });
  }
}
