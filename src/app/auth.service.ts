import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import * as moment from "moment";
import { tap } from "rxjs/operators";

@Injectable( {
  providedIn: 'root'
} )
export class AuthService {

  constructor( private http: HttpClient, private router: Router ) {

  }

  login( name: string, password: string ) {
    return this.http.post<any>( '/api/login', { name, password } )
      .pipe(
        tap( res => this.setSession( res ) ),
        tap( _ => console.log( "User is logged in" ) ),
        tap( _ => this.router.navigateByUrl( '/' ) )
      ).subscribe();
  }

  private setSession( authResult: any ) {
    const expiresAt = moment().add( authResult.expiresIn, 'second' );

    localStorage.setItem( 'token', authResult.token );
    localStorage.setItem( "expires_at", JSON.stringify( expiresAt.valueOf() ) );
  }

  private removeSession() {
    localStorage.removeItem( "token" );
    localStorage.removeItem( "expires_at" );
  }

  logout() {

    return this.http.post<any>( '/api/logout', {} )
      .pipe(
        tap( _ => this.removeSession() ),
        tap( _ => console.log( "User is logged out" ) ),
        tap( _ => this.router.navigateByUrl( '/login' ) )
      ).subscribe();

  }

  public isLoggedIn() {
    return moment().isBefore( this.getExpiration() );
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem( "expires_at" );
    const expiresAt = JSON.parse( expiration as string );
    return moment( expiresAt );
  }
}