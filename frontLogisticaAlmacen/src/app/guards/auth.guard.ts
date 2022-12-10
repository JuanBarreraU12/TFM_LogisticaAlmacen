import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Util } from '../classes/util';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    let userSession = Util.getUserSession();
    console.log(userSession);
    if (!userSession) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
