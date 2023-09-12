import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthGuard } from './auth.guard'; // Import the AuthGuard class

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuard); // Inject the AuthGuard class
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access when authenticated', () => {
    // You can mock your AuthService isAuthenticated() method here
    spyOn(guard['authService'], 'isLoggedIn').and.returnValue(true);

    const canActivate = guard.canActivate(
      {} as ActivatedRouteSnapshot,
      {} as RouterStateSnapshot
    );

    expect(canActivate).toBe(true);
  });

  it('should redirect to login when not authenticated', () => {
    // You can mock your AuthService isAuthenticated() method here
    spyOn(guard['authService'], 'isLoggedIn').and.returnValue(false);

    const canActivate = guard.canActivate(
      {} as ActivatedRouteSnapshot,
      {} as RouterStateSnapshot
    );

    // Expect canActivate to be a UrlTree that redirects to /login
    expect(canActivate.toString()).toContain('/login');
  });
});
