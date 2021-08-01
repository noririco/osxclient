import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { Tenant } from './../models/tenant.model';

@UntilDestroy()
@Injectable()
export class TenantService {
  private _tenants: BehaviorSubject<Tenant[]> = new BehaviorSubject<Tenant[]>( [] );
  get tenants(): Tenant[] {
    return this._tenants.value;
  }
  set tenants( tenants: Tenant[] ) {
    this._tenants.next( tenants );
  }

  tenants$ = this._tenants.asObservable();

  tenantsNoDebt$ = this.tenants$.pipe(
    map( ( _ts ) => _ts.filter( _t => _t.debt === 0 ) ),
    shareReplay(),
    untilDestroyed( this )
  );
  tenantsWithDebt$ = this.tenants$.pipe( map( ( _ts ) => _ts.filter( _t => _t.debt > 0 ) ),
    shareReplay(),
    untilDestroyed( this )
  );

  constructor( private http: HttpClient ) {
    this.getAll().pipe( shareReplay(), untilDestroyed( this ) ).subscribe();
  }

  getAll() {
    return this.http.get<any[]>( `/api/tenants` )
      .pipe(
        tap( ( tenants ) => console.log( tenants ) ),
        tap( ( tenants ) => this.tenants = tenants ),
      )
  }

  getOne( id: any ) {
    return this.http.get<Tenant>( `/api/tenant/${id}` )
      .pipe(
        tap( ( tenant ) => console.log( tenant ) ),
        switchMap( () => this.getAll() )
      )
  }

  create( payload: Tenant ) {
    return this.http.post<Tenant>( `/api/tenant`, payload )
      .pipe(
        tap( ( tenant ) => console.log( tenant ) ),
        switchMap( () => this.getAll() )
      ).subscribe();
  }

  update( payload: Tenant ) {
    this.http.put<Tenant>( `/api/tenant/${payload._id}`, payload )
      .pipe(
        tap( ( tenant ) => console.log( tenant ) ),
        catchError( ( err ) => {
          console.error( err );
          return of( err )
        } ),
        switchMap( () => this.getAll() )
      ).subscribe()
  }

  delete( id: any ) {
    return this.http.delete<any>( `/api/tenant/${id}` )
      .pipe(
        tap( ( res ) => console.log( res ) ),
        switchMap( () => this.getAll() )
      ).subscribe()
  }


}
