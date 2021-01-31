
import { ValidatorsService } from './validators.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import { AccountService } from '../account.service';
import { SharedsService } from '../shareds.service';





@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule,
    
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    ToastModule,
  ],
  providers: [
    AccountService,
    ValidatorsService,
    SharedsService
  ]
})
export class SharedsModule { }
