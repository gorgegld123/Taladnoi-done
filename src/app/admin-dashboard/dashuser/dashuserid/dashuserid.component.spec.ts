import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashuseridComponent } from './dashuserid.component';

describe('DashuseridComponent', () => {
  let component: DashuseridComponent;
  let fixture: ComponentFixture<DashuseridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashuseridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashuseridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
