import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopinfoComponent } from './shopinfo.component';

describe('ShopinfoComponent', () => {
  let component: ShopinfoComponent;
  let fixture: ComponentFixture<ShopinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
