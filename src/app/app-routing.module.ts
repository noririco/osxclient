import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  // home route protected by auth guard
  { path: '', loadChildren: () => import( './tenants/tenants.module' ).then( m => m.TenantsModule ), canActivate: [ AuthGuard ] },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }

];

@NgModule( {
  imports: [ RouterModule.forRoot( routes ) ],
  exports: [ RouterModule ]
} )
export class AppRoutingModule { }
