import {CanActivate, Router} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';


export class authGuard implements CanActivate  {
  constructor(private auth: AuthService,private router: Router, private toast: NgToastService){}

  canActivate(): boolean  {
    if (this.auth.isLoggedIn()) {
      return true;
    }
    else {
      this.toast.error({detail:"ERROR",summary:"Please Login First!"})
      this.router.navigate(['login'])
      return false;
    }
  }
};
