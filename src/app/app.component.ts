import { AuthService } from 'src/app/auth.service';
import { Component } from '@angular/core';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
} )
export class AppComponent {
  title = 'osxtenants';
  constructor( public authService: AuthService ) {

  }
}
