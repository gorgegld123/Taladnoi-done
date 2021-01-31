import { FormGroup } from '@angular/forms';


export interface ILoginComponent {
  form: FormGroup;
  onSubmit(): void;
}

export interface ILogin {
  username: string;
  password: string;
  remember:Boolean;
}
