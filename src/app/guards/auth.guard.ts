import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Inject, inject } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

export const authGuard: CanActivateFn = (route, state) => {
  const auth: AuthService = inject(AuthService)
  const router: Router = inject(Router)
  const toast: NgToastService = inject(NgToastService)

  if (auth.isLoggedIn()) {
    return true;
  }
  else {
    toast.error({detail:"ERROR",summary:"Please Login First!"})
    router.navigate(['login'])
    return false;
  }
};
