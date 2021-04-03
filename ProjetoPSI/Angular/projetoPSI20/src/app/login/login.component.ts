import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  private nick;
  private pw;
  public error;

  constructor() { 
    this.nick = "";
    this.pw = ""
    this.error = "";
  }

  ngOnInit(): void {
  }

  entrar(): void {

    this.error = "";

    console.log("ENTREI " + this.nick + " " + this.pw)

    //NICK TEM DE TER PELO MENOS 3 CARACTERS
    if(!this.nick || this.nick.length < 3){
      this.error = "Nickname must have at least 3 chars";
      return;
    }

    //NICK TEM DE SER UNICO
    //TODO *******************************************************************************************

    //PASSWORD 8 ou + (uma letra maiuscula, uma minuscula, algarismo)
    if(!this.pw || this.pw.length < 8){
      this.error = "Password must be at least 8 chars";
      return;
    }
 
    //TODO - SEPARAR ISTO 
    //if(!this.pw.match("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$")){
    //  this.error = "Password must have at least one digit, one uppercase letter and one lowercase letter";
    //  return;
   // }

    //FAZER LOGIN E ENTRAR NO SITE
    //TODO *******************************************************************************************
    if(!this.pw || this.pw.length < 8){
      this.error = "Password must be at least 8 chars";
      return;
    }
 
    //TODO - SEPARAR ISTO 
    //if(!this.pw.match("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$")){
    if(!this.pw.match("^(?=.*[0-9])")){
      this.error = "Password must have at least one digit";
      return;
    }

    if(!this.pw.match("^(?=.*[a-z])")){
      this.error = "Password must have at least one lowercase letter";
      return;
    }

    if(!this.pw.match("^(?=.*[A-Z])")){
      this.error = "Password must have at least one uppercase letter";
      return;
    }

  }

  //ATUALIZA O NICK QUANDO O INPUT É ALTERADO
  nicknameInsert(nick: string): void {
    this.nick = nick;
  }

  //ATUALIZA O PASSWORD QUANDO O INPUT É ALTERADO
  passwordInsert(pw: string): void {
    this.pw = pw;
  }

}
