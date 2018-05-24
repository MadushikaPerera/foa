import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class AdminauthguardGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (!this.checkauth()) {
        this.router.navigate(['/login']);
      }
      if (this.checkauth()) {
        if (!this.checkadmin()) {
          this.router.navigate(['/restaurant']);
        }
      }
      return this.checkadmin();
  }

  checkauth() {
    return ('usertoken' in localStorage);
  }

  checkadmin(){
    return parseInt(localStorage.getItem("access"))===1;
  }
}
