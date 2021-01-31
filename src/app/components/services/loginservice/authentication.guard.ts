
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenService } from './authen.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private authen: AuthenService,
    private router: Router) {}

  canActivate() {
      if (this.authen.getAuthenticated()) {
        return true;
      }
      this.router.navigate(['/login']);
      return false;
    }

}
