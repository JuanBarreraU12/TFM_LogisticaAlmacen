import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Util } from '../classes/util';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let ok: boolean = true;
    let userSession = Util.getUserSession();
    if (!userSession)
      ok = false;

    if (ok) {
      const role = route.data['expectedRole'];
      if (role !== userSession.user_role) ok = false;
    }

    if (!ok) this.router.getCurrentNavigation();
    return ok;
  }
}
