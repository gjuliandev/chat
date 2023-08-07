import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../providers/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private firebaseService: FirebaseService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if ( this.firebaseService.isLoggedIn() ) {
        return true;
      }
      
      if ( !this.firebaseService.isLoggedIn() ) {
        this.router.navigateByUrl('/auth/login');
        return false;
      }
    return false;
  }
  
}
