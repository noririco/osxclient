import { TenantService } from './../tenant.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

@Component( {
  selector: 'app-add-tenant',
  template: `
  <form [formGroup]="form">
          <div class="form-field">
              <label>Name:</label>
              <input name="name" formControlName="name">
          </div>
          <div class="form-field">
              <label>Phone Number:</label>
              <input name="phone_number" formControlName="phone_number">
          </div>
          <div class="form-field">
              <label>Address:</label>
              <input name="address" formControlName="address">
          </div>
          <div class="form-field">
              <label>Debt:</label>
              <input name="debt" formControlName="debt">
          </div>
      <div class="form-buttons">
          <button type="submit" (click)="create()">Create Tenant</button>
      </div>
  </form>
  <p>Note: there is no error handling for this form.</p>
  `,
  styleUrls: [ './add-tenant.component.scss' ]
} )
export class AddTenantComponent implements OnInit {
  form: FormGroup;
  constructor( private fb: FormBuilder, private tenantService: TenantService ) {
    this.form = this.fb.group( {
      name: [ '', Validators.required ],
      phone_number: [ '', Validators.required ],
      address: [ '', Validators.required ],
      debt: [ 0, Validators.required ],
    } );
  }

  ngOnInit(): void {
  }

  create() {
    console.log( JSON.stringify( this.form.value, null, 4 ) );

    this.tenantService.create( this.form.value );

    this.form.reset();
  }

}
