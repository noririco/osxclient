import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Injectable( {
  providedIn: 'root'
} )
export class AuthGuard implements CanActivate {

  constructor( private router: Router, private authService: AuthService ) { }

  canActivate() {
    if ( this.authService.isLoggedIn() ) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate( [ '/login' ] );
    return false;
  }
}
