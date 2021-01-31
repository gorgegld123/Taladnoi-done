import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooteronlylayoutComponent } from './footeronlylayout.component';

describe('FooteronlylayoutComponent', () => {
  let component: FooteronlylayoutComponent;
  let fixture: ComponentFixture<FooteronlylayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooteronlylayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooteronlylayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
