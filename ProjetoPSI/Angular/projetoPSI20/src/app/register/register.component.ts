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
  private listError : string[];

  public fotografo;
  public utilizador;
  public tipo;
  
  constructor() { 
    this.nick = "";
    this.pw = ""
    
    this.error = "";
    this.listError = [];

    this.fotografo = "fotografo";
    this.utilizador = "utilizador";
    this.tipo = "fotografo";
  }

  ngOnInit(): void {
    this.nicknameRegister("");
    this.passwordRegister("");
  }
 
  //ATUALIZA O NICK QUANDO O INPUT É ALTERADO
  nicknameRegister(nick: string): void {
    this.nick = nick;

    //PELO MENOS 3 CHARS
    const msg = "Nickname deve ter pelo menos 3 caracteres\n";
    if(!this.nick || this.nick.length < 3){
      if(!this.listError.includes(msg)){
        this.listError.push(msg);
      }
    } else {
      if(this.listError.includes(msg)){
        const index = this.listError.indexOf(msg, 0);
        if (index > -1) {
          this.listError.splice(index, 1);
        }
      }
    }

    //NAO PODE TER CHARS ESPECIAIS
    const msg2 = "Nickname não pode ter caracteres especiais\n";
    if(this.nick.match("^(?=.*[@$!%*?&#^-])")){
      if(!this.listError.includes(msg2)){
        this.listError.push(msg2);
      }
    } else {
      if(this.listError.includes(msg2)){
        const index = this.listError.indexOf(msg2, 0);
        if (index > -1) {
          this.listError.splice(index, 1);
        }
      }
    }

    this.updateErrorMensage();
  }

   //ATUALIZA O NICK QUANDO O INPUT É ALTERADO
  passwordRegister(pw: string): void {
    this.pw = pw;
    
    //PASS TEM DE TER PELO MENOS 8 CHARS
    const msg3 = "Password deve ter no mínimo 8 caracteres\n";
    if(!this.pw || this.pw.length < 8){
      if(!this.listError.includes(msg3)){
        this.listError.push(msg3);
      }
    } else {
      if(this.listError.includes(msg3)){
        const index = this.listError.indexOf(msg3, 0);
        if (index > -1) {
          this.listError.splice(index, 1);
        }
      }
    }

    //PASS TEM DE TER PELO MENOS UM DIGITO
    const msg4 = "Password deve ter no mínimo 1 dígito\n";
    if(!this.pw.match("^(?=.*[0-9])")){
      if(!this.listError.includes(msg4)){
        this.listError.push(msg4);
      }
    } else {
      if(this.listError.includes(msg4)){
        const index = this.listError.indexOf(msg4, 0);
        if (index > -1) {
          this.listError.splice(index, 1);
        }
      }
    }

    //PASS TEM DE TER PELO MENOS UM LOWERCASE LETTER
    const msg5 = "Password deve ter pelo menos uma letra minúscula\n";
    if(!this.pw.match("^(?=.*[a-z])")){
      if(!this.listError.includes(msg5)){
        this.listError.push(msg5);
      }
    } else {
      if(this.listError.includes(msg5)){
        const index = this.listError.indexOf(msg5, 0);
        if (index > -1) {
          this.listError.splice(index, 1);
        }
      }
    }

    //PASS TEM DE TER PELO MENOS UM UPPERCASE LETTER
    const msg6 = "Password deve ter pelo menos uma letra maiúscula\n";
    if(!this.pw.match("^(?=.*[A-Z])")){
      if(!this.listError.includes(msg6)){
        this.listError.push(msg6);
      }
    } else {
      if(this.listError.includes(msg6)){
        const index = this.listError.indexOf(msg6, 0);
        if (index > -1) {
          this.listError.splice(index, 1);
        }
      }
    }
   
    this.updateErrorMensage();
  }

  updateErrorMensage(){
    this.error = "";
    this.listError.forEach(e => this.error += e);
  }

  registar(): void {
    
    //NICK TEM DE TER PELO MENOS 3 CARACTERS
    if(!this.nick || this.nick.length < 3){
      return;
    }
    //NICK NAO PODE TER CHARS ESPECIAIS
    if(this.nick.match("^(?=.*[@$!%*?&#^-])")){
      return;
    }

    //PASS TEM DE TER PELO MENOS 8 CHARS
    if(!this.pw || this.pw.length < 8){
      return;
    }
    //PASS TEM DE TER PELO MENOS UM DIGITO
    if(!this.pw.match("^(?=.*[0-9])")){
      return;
    }
    //PASS TEM DE TER PELO MENOS UM LOWERCASE LETTER
    if(!this.pw.match("^(?=.*[a-z])")){
      return;
    }
    //PASS TEM DE TER PELO MENOS UM UPPERCASE LETTER
    if(!this.pw.match("^(?=.*[A-Z])")){
      return;
    }


    const msg7 = "Nickname is already in use";
    if(this.jaExisto()){
      if(!this.listError.includes(msg7)){
        this.listError.push(msg7);
      }
    } else {
      //REMOVER ERROR
      if(this.listError.includes(msg7)){
        const index = this.listError.indexOf(msg7, 0);
        if (index > -1) {
          this.listError.splice(index, 1);
        }
      }
      this.criarUtilizador();
    }

  }

  souFotografo(): void {
    this.tipo = "fotografo";
  }

  souUtilizador(): void {
    this.tipo = "utilizador";
  }

  jaExisto(): boolean {


    //TODO


    //fazer verificacoes na bd para ver se este nickname ja existe
    return false;
  }

  criarUtilizador(): void {

    //TODO METER NA BD

  }


}
