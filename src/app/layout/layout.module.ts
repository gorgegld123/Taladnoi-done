import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooteronlylayoutComponent } from './footeronlylayout/footeronlylayout.component';
import { LayoutComponent } from './layout.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    
  ],
  exports: [
    LayoutComponent,
    FooteronlylayoutComponent
  ],
  declarations: [
    LayoutComponent,
    FooteronlylayoutComponent,
  ]
})
export class LayoutModule { }
