import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TenantService } from './tenant.service';
import { TenantsRoutingModule } from './tenants-routing.module';
import { TenantsComponent } from './tenants.component';
import { TableComponent } from './table/table.component';
import { MatTableModule } from '@angular/material/table';
import { AddTenantComponent } from './add-tenant/add-tenant.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule( {
  declarations: [
    TenantsComponent,
    TableComponent,
    AddTenantComponent,
  ],
  imports: [
    CommonModule,
    TenantsRoutingModule,
    ReactiveFormsModule,
    MatTableModule
  ],
  exports: [ TenantsComponent ],
  providers: [ TenantService ]
} )
export class TenantsModule { }
