import { FormGroup } from '@angular/forms';
import {FormsModule , ReactiveFormsModule} from '@angular/forms';

export interface IRegisterComponent {
  registerForm: FormGroup;
  onSubmit();
}

export interface IRegister {
  id: number;
  username: string;
  password: string;
  cpassword: string;
  firstname: string;
  lastname: string;
  identification: string;
  email: string;
  phone: string;
  postcode: string;
  address: string; 
}
