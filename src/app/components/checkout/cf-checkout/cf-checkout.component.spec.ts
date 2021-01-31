import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfCheckoutComponent } from './cf-checkout.component';

describe('CfCheckoutComponent', () => {
  let component: CfCheckoutComponent;
  let fixture: ComponentFixture<CfCheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfCheckoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
