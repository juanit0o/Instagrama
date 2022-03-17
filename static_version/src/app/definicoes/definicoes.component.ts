import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { AuthenticationService, TokenPayload } from '../authentication.service';

@Component({
  selector: 'app-definicoes',
  templateUrl: './definicoes.component.html',
  styleUrls: ['./definicoes.component.css']
})
export class DefinicoesComponent implements OnInit {

  credentials: TokenPayload = {
    nickname: '',
    password: ''
  }

  pwNova: string;
  pwConfirmarNova: string;

  error: string;
  listError: string[];

  constructor(private auth: AuthenticationService) {

    this.credentials.nickname = this.auth.getUserDetails()?.nickname.toString();
    this.credentials.password = "";
    this.pwNova = "";
    this.pwConfirmarNova = "";

    this.error = "";
    this.listError = [];
  }

  //INIT
  ngOnInit(): void {
  }

  //Verifica se a password nova confirmada é igual à usada
  // ou se é igual a password atual
  verificarPassIguais(): boolean {
    if(this.pwNova !== this.pwConfirmarNova){
      this.error = "Passwords diferentes.\n";
      return false;
    } else if(this.pwNova === this.credentials.password) {
      this.error = "Password nova não pode ser igual a password atual";
      return false;
    }
    return true;
  }

  // Guarda a nova password referente ao cliente corrente
  guardarAlteracoes(): void {
    console.log('NICK: '+ this.credentials.nickname + '\nATUAL: '+ this.credentials.password +
    '\nNOVA: '+ this.pwNova + '\nCONFIRMARNOVA: ' + this.pwConfirmarNova);

    this.verificarPassIguais();

    // Verificar se a password atual está correta
    this.auth.login(this.credentials).subscribe(() => {
      // Password atual inserida correta

      // Atualizar as credenciais
      this.credentials.password = this.pwNova;

      // Chamar a função que fará o update da password
      this.auth.update(this.credentials).subscribe(() => {
        // Password está no formato correto e foi atualizada
        // Mostrar msg de sucesso
      }, () => {
        // Password não está no formato correto
        this.error = "Password nova não está no formato correto";
        // Mostrar o que falta na password
      })
    }, () => {
      // Password atual inserida errada
      this.error = "Password incorreta";
    });
  }

  eliminarConta(): void {
    confirm("Tem a certeza que pretende eliminar apagar a sua conta?")
  }

  updateErrorMensage(){
    this.error = "";
    this.listError.forEach(e => this.error += e);
  }

}
