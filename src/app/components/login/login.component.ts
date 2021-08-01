import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/auth.service";

@Component( {
  selector: 'app-login',
  template: `
<form [formGroup]="form">
    <fieldset>
        <legend>Login</legend>
        <div class="form-field">
            <label>Email:</label>
            <input name="name" formControlName="name">
        </div>
        <div class="form-field">
            <label>Password:</label>
            <input name="password" formControlName="password" 
                   type="password">
        </div>
    </fieldset>
    <div class="form-buttons">
        <button class="button button-primary" 
                (click)="login()">Login</button>
    </div>
</form>`} )
export class LoginComponent {
  form: FormGroup;

  constructor( private fb: FormBuilder,
    private authService: AuthService,
  ) {

    this.form = this.fb.group( {
      name: [ '', Validators.required ],
      password: [ '', Validators.required ]
    } );
  }

  login() {
    const val = this.form.value;

    if ( val.name && val.password ) {
      this.authService.login( val.name, val.password )

    }
  }
}