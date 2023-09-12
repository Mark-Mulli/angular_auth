import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private toast : NgToastService){   }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    })
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = 'fa-eye' : this.eyeIcon = 'fa-eye-slash';
    this.isText ? this.type = "text" : this.type = "password";

  }

  onLogin() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value)
      .subscribe({
        next: (res) => {
          //toastr
          this.auth.storeToken(res.token)
          this.toast.success({detail:"SUCCESS",summary:"Login Successful",duration:5000})
          this.loginForm.reset()
          this.router.navigate(['dashboard'])
        },
        error: (err) => {
          //toastr
          this.toast.error({detail:"ERROR",summary:err?.error.message,duration:5000})
        }

      })
    }

    else {
      this.validateFormFields(this.loginForm);
      //toastr
      this.toast.error({detail:"ERROR",summary:"Your form is invalid",duration:5000})
    }
  }

  private validateFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field=>{
      const control = formGroup.get(field)
      if (control instanceof FormControl) {
        control.markAsDirty({onlySelf : true});
      }
      else if (control instanceof FormGroup) {
        this.validateFormFields(control)
      }

    })

  }
}
