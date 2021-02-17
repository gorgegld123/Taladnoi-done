import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditshopdetailComponent } from './editshopdetail.component';

describe('EditshopdetailComponent', () => {
  let component: EditshopdetailComponent;
  let fixture: ComponentFixture<EditshopdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditshopdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditshopdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
