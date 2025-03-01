import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate{

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    alert('You are not allowed to access this page as its undergoing development and/or refresh');
    this.router.navigate(['home']);
    return false; // before we can use we must import the routeguardservice in main mod, then we can go routing can put the canactivated thing
  }
}
