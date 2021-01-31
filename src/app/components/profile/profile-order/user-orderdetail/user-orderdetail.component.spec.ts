import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrderdetailComponent } from './user-orderdetail.component';

describe('UserOrderdetailComponent', () => {
  let component: UserOrderdetailComponent;
  let fixture: ComponentFixture<UserOrderdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserOrderdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOrderdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
