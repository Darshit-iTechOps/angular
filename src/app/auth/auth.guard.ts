import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { StorageHelper } from '@helpers/StorageHelper.helper';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  storageHelper: StorageHelper = new StorageHelper();

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.storageHelper.GetLoggedIn()) {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}
