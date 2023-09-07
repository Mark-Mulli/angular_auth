import { Component , OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  signUpForm! : FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router){

  }
  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstname: ['',Validators.required],
      lastname: ['',Validators.required],
      email: ['',Validators.required],
      username: ['',Validators.required],
      password: ['',Validators.required]

    })

  }
  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = 'fa-eye' : this.eyeIcon = 'fa-eye-slash';
    this.isText ? this.type = "text" : this.type = "password";

  }

  onSignUp() {
    if(this.signUpForm.valid) {

      this.auth.signUp(this.signUpForm.value)
      .subscribe({
        next: (res) => {
          alert(res.message)
          this.signUpForm.reset()
          this.router.navigate(['login'])
        },
        error: (err) => {
          alert(err?.error.message)
        }
      })

    }
    else {

      this.validateFormFields(this.signUpForm);
      alert("Your form is invalid");

    }

  }

  private validateFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field =>{

      const control = formGroup.get(field)

      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      }
      else if( control instanceof FormGroup ) {
        this.validateFormFields(control)
      }

    })
  }

}
