import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AutenticacaoService } from '../autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  private nick;
  private pw;

  public error;
  private listError : string[];

  constructor(private autService: AutenticacaoService) { 
    this.nick = "";
    this.pw = ""
    
    this.error = "";
    this.listError = [];
  }

  //INIT
  ngOnInit(): void {
    this.nicknameInsert("");
    this.passwordInsert("");
  }

  //AO CLICAR NO BOTAO DE LOGIN
  entrar(): void {

    //VERIFICACOES DA PW É NO REGISTO 
    this.login();
    

  }

  //ATUALIZA O NICK QUANDO O INPUT É ALTERADO
  nicknameInsert(nick: string): void {
    this.nick = nick;
  }

  //ATUALIZA O PASSWORD QUANDO O INPUT É ALTERADO
  passwordInsert(pw: string): void {
    this.pw = pw;
  }

  updateErrorMensage(){
    this.error = "";
    this.listError.forEach(e => this.error += e);
  }

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


}
