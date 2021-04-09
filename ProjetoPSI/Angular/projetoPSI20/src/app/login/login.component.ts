import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  //private nick;
  //private pw;
  credentials: TokenPayload = {
    nickname: '',
    password: ''
  };

  public error;
  private listError : string[];

  constructor(private auth: AuthenticationService,
    private router: Router,
    ReactiveFormsModule: ReactiveFormsModule) { 
    //this.nick = "";
    //this.pw = ""
    
    this.error = "";
    this.listError = [];
  }

  //INIT
  ngOnInit(): void {
    //this.nicknameInsert("");
    //this.passwordInsert("");
  }

  //AO CLICAR NO BOTAO DE LOGIN
  entrar(): void {

    //VERIFICACOES DA PW É NO REGISTO 
    this.login();
    

  }

  //ATUALIZA O NICK QUANDO O INPUT É ALTERADO
  //nicknameInsert(nick: string): void {
  //  this.credentials.nickname = nick;
  //}

  //ATUALIZA O PASSWORD QUANDO O INPUT É ALTERADO
  //passwordInsert(pw: string): void {
  //  this.pw = pw;
  //}

  updateErrorMensage(){
    this.error = "";
    this.listError.forEach(e => this.error += e);
  }

  login() {
    this.auth.login(this.credentials).subscribe(() => {
/*
      this.auth.hasPhotos(this.credentials.nickname)).subscribe(out => {
        if(out.msg == "SUCESSO"){
          this.router.navigateByUrl('/perfil/'+this.credentials.nickname);
        } else {
          this.router.navigateByUrl('/feed');
        }
      })
*/
      this.router.navigateByUrl('/feed');
    }, (err) => {
      console.error(err);
    }); 
  }

  /*
  login(): void {
    this.autService.login(this.nick, this.pw).subscribe(out => {
        if(out.msg == "SUCESSO LOGIN"){
          console.log(out.msg);
          
        //this.autService.hasPhotos(this.nick)
        //SE TIVER FOTOS VAI PARA O PERFIL
        window.location.href = "http://localhost:4200/feed";

        //SENAO VAI PARA O FEED

      } else {
        this.listError = []
        this.listError.push("Falha na autenticação!");
        this.updateErrorMensage();
      }
    });
  }

  logout(): void {
    this.autService.logout(this.nick).subscribe(out => {
      if(out.msg == "SUCESSO LOGOUT"){
        console.log(out.msg);
        
      window.location.href = "http://localhost:4200/";


    } else {
      //this.listError = []
      //this.listError.push("Falha na autenticação!");
      //this.updateErrorMensage();
    }
  });
  }*/


}
