import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { User } from '../user';
import { AutenticacaoService } from '../autenticacao.service';

@Component({
  selector: 'app-definicoes',
  templateUrl: './definicoes.component.html',
  styleUrls: ['./definicoes.component.css']
})
export class DefinicoesComponent implements OnInit {

  public nick;
  private pwAtual;
  private pwNova;
  private pwConfirmarNova;

  public error;
  private listError: string[];

  constructor(private autService: AutenticacaoService) { 
    this.nick = "diogo"; //TODO: hardcoded por enquanto, ainda nao se sabe quem eh o client
    this.pwAtual = "";
    this.pwNova = "";
    this.pwConfirmarNova = "";

    this.error = "";
    this.listError = [];
  }

  //INIT
  ngOnInit(): void {
  }

  //Verifica se a password atual está correta
  pwAtualInsert(pwAtual : string): void {
    this.pwAtual = pwAtual;
  }

  //Inserir a password nova
  pwNovaInsert(pwNova : string): void {
    this.pwNova = pwNova;

    
  }

  //Verifica se a password nova confirmada é igual à usada
  pwNovaConfirmarInsert(pwNovaConfirmar : string): void {
    if(this.pwNova === pwNovaConfirmar){
        this.pwConfirmarNova = pwNovaConfirmar;
    } else {
      const msg10 = "Passwords diferentes.\n";
    }
  }

  guardarAlteracoes(): void {
    console.log('NICK: '+this.nick + '\nATUAL: '+ this.pwAtual + 
    '\nNOVA: '+ this.pwNova + '\nCONFIRMARNOVA: ' + this.pwConfirmarNova);
    /**
    this.autService.update(this.nick, this.pwNova).subscribe(out => {
      console.log(out.msg);
      if (out.msg == "SUCESSO UPDATE") {
        window.location.href = "http://localhost:4200/feed";
      } else {
        console.log('erro update @ definicoes.component');
      }
    })
    */
  }

  eliminarConta(): void {}

  updateErrorMensage(){
    this.error = "";
    this.listError.forEach(e => this.error += e);
  }

}
