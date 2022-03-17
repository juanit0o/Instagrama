import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';
import { PhotoService } from '../photo.service'

import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  credentials: TokenPayload = {
    nickname: '',
    password: ''
  };

  public error;
  private listError : string[];

  constructor(private photoService: PhotoService,private auth: AuthenticationService,
    private router: Router,
    ReactiveFormsModule: ReactiveFormsModule) { 
    
    this.error = "";
    this.listError = [];
  }

  //INIT
  ngOnInit(): void {

  }

  //AO CLICAR NO BOTAO DE LOGIN
  entrar(): void {
    this.login();
  }

  updateErrorMensage(){
    this.error = "";
    this.listError.forEach(e => this.error += e);
  }

  login() {

    if(this.credentials.nickname === "demo" && this.credentials.password === "demo") {
      this.router.navigateByUrl('/feed');
    }

    /*
    this.auth.login(this.credentials).subscribe(() => {
      this.photoService.getDonosFotos(this.credentials.nickname!).subscribe(out => {
        if(out.length > 0){
          this.router.navigateByUrl('/perfil/'+this.credentials.nickname);
        } else {
          this.router.navigateByUrl('/feed');
        }
      })
    }, (err) => {
      console.error(err);
      this.error = "Password ou nickname incorretos";
    }); 
    */

  }
  
}
