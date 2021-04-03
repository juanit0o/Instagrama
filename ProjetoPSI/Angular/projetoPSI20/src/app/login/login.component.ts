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

    /* VERIFICACOES DA PW É NO REGISTO 


    */

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
