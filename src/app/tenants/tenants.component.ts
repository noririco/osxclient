import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import { Tenant } from '../models/tenant.model';
import { TenantService } from './tenant.service';

@UntilDestroy()
@Component( {
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: [ './tenants.component.scss' ]
} )
export class TenantsComponent implements OnInit {

  private _tenants: BehaviorSubject<Tenant[]> = new BehaviorSubject<Tenant[]>( [] );
  get tenants(): Tenant[] {
    return this._tenants.value;
  }
  set tenants( tenants: Tenant[] ) {
    this._tenants.next( tenants );
  }
  tenants$ = this._tenants.asObservable();
  constructor( public tenantService: TenantService ) { }

  ngOnInit(): void {
    this.all();
  }

  all() {
    this.tenantService.tenants$
      .pipe( untilDestroyed( this ) )
      .subscribe( ( ts ) => {
        this.tenants = ts;
      } )
  }

  withDebt() {
    this.tenantService.tenantsWithDebt$
      .pipe( untilDestroyed( this ) )
      .subscribe( ( ts ) => {
        this.tenants = ts;
      } )
  }

  noDebt() {
    this.tenantService.tenantsNoDebt$
      .pipe( untilDestroyed( this ) )
      .subscribe( ( ts ) => {
        this.tenants = ts;
      } )
  }
}
