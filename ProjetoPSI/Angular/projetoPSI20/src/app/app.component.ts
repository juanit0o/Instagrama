import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';

export var nick : string;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projetoPSI20';

  constructor(public auth: AuthenticationService) {}

  
}
