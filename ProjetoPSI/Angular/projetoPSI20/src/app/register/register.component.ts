import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private nick;
  private pw;
  public error;

  public fotografo;
  public utilizador;
  public tipo;
  

  constructor() { 
    this.nick = "";
    this.pw = ""
    this.error = "";
    
    this.fotografo = "fotografo";
    this.utilizador = "utilizador";
    this.tipo = "fotografo";
    
  }

  ngOnInit(): void {
  }
 
  //ATUALIZA O NICK QUANDO O INPUT É ALTERADO
 nicknameRegister(nick: string): void {
    this.nick = nick;
  }

   //ATUALIZA O NICK QUANDO O INPUT É ALTERADO
 passwordRegister(nick: string): void {
    this.nick = nick;
  }

  registar(): void {
    
    this.error = "";

    console.log("ENTREI " + this.nick + " " + this.pw)

    //NICK TEM DE TER PELO MENOS 3 CARACTERS
    if(!this.nick || this.nick.length < 3){

      const element: HTMLElement = document.getElementById('error-register') as HTMLElement;
      element.innerHTML = 'Nickname must have at least 3 chars';
      //document.getElementById(error-register)
      this.error = "Nickname must have at least 3 chars";
      return;
    }

    //FAZER LOGIN E ENTRAR NO SITE
    //TODO *******************************************************************************************
    if(!this.pw || this.pw.length < 8){
      const element: HTMLElement = document.getElementById('error-register') as HTMLElement;
      element.innerHTML = 'Password must be at least 8 chars';
      this.error = "Password must be at least 8 chars";
      return;
    }
 
    //TODO - SEPARAR ISTO 
    //if(!this.pw.match("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$")){
    if(!this.pw.match("^(?=.*[0-9])")){
      const element: HTMLElement = document.getElementById('error-register') as HTMLElement;
      element.innerHTML = 'Password must have at least one digit';
      this.error = "Password must have at least one digit";
      return;
    }

    if(!this.pw.match("^(?=.*[a-z])")){
      const element: HTMLElement = document.getElementById('error-register') as HTMLElement;
      element.innerHTML = 'Password must have at least one lowercase letter';
      this.error = "Password must have at least one lowercase letter";
      return;
    }

    if(!this.pw.match("^(?=.*[A-Z])")){
      const element: HTMLElement = document.getElementById('error-register') as HTMLElement;
      element.innerHTML = 'Password must have at least one uppercase letter';
      this.error = "Password must have at least one uppercase letter";
      return;
    }

  }

  souFotografo(): void {
    this.tipo = "fotografo";
  }

  souUtilizador(): void {
    this.tipo = "utilizador";
  }


}
