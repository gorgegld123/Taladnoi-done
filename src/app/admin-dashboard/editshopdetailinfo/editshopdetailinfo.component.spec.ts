import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditshopdetailinfoComponent } from './editshopdetailinfo.component';

describe('EditshopdetailinfoComponent', () => {
  let component: EditshopdetailinfoComponent;
  let fixture: ComponentFixture<EditshopdetailinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditshopdetailinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditshopdetailinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
