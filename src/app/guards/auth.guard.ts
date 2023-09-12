import {CanActivate} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';


export class authGuard implements CanActivate  {
  constructor(private auth: AuthService){}

  canActivate(): boolean  {
    if (this.auth.isLoggedIn()) {
      return true;
    }
    else {
      return false;
    }
  }
};
