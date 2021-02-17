import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashuserComponent } from './dashuser.component';

describe('DashuserComponent', () => {
  let component: DashuserComponent;
  let fixture: ComponentFixture<DashuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
