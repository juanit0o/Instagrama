import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  credentials: TokenPayload = {
    nickname: '',
    password: ''
  };

  public error;
  private listError : string[];

  constructor(private auth: AuthenticationService, private router: Router) { 

    this.error = "";
    this.listError = [];
    
  }

  //INIT
  ngOnInit(): void {

  }
 
  //ATUALIZA O NICK QUANDO O INPUT É ALTERADO
  nicknameRegister(): void {
    //this.credentials.nickname = nick;

    const msgExist = "Nickname já existe!\n";
    if(this.listError.includes(msgExist)){
      const index = this.listError.indexOf(msgExist, 0);
      if (index > -1) {
        this.listError.splice(index, 1);
      }
    }

    //PELO MENOS 3 CHARS
    const msg = "Nickname deve ter pelo menos 3 caracteres\n";
    if(!this.credentials.nickname || this.credentials.nickname.length < 3){
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
    if(this.credentials.nickname!.match("^(?=.*[@._$!%*?&#^-])")){
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
  passwordRegister(): void {
    
    //PASS TEM DE TER PELO MENOS 8 CHARS
    const msg3 = "Password deve ter no mínimo 8 caracteres\n";
    if(!this.credentials.password || this.credentials.password.length < 8){
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
    if(!this.credentials.password.match("^(?=.*[0-9])")){
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
    if(!this.credentials.password.match("^(?=.*[a-z])")){
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
    if(!this.credentials.password.match("^(?=.*[A-Z])")){
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

  //ATUALIZA OS ERROS DO REGISTAR (O QUE FALTA NO NICK OU NA PASS)
  updateErrorMensage(){
    this.error = "";
    this.listError.forEach(e => this.error += e);
  }

  //REGISTAR O UTILIZADOR
  registar(): void {
    
    //NICK TEM DE TER PELO MENOS 3 CARACTERS
    if(!this.credentials.nickname || this.credentials.nickname.length < 3){
      return;
    }
    //NICK NAO PODE TER CHARS ESPECIAIS
    if(this.credentials.nickname.match("^(?=.*[@$!%*?&#^-])")){
      return;
    }

    //PASS TEM DE TER PELO MENOS 8 CHARS
    if(!this.credentials.password || this.credentials.password.length < 8){
      return;
    }
    //PASS TEM DE TER PELO MENOS UM DIGITO
    if(!this.credentials.password.match("^(?=.*[0-9])")){
      return;
    }
    //PASS TEM DE TER PELO MENOS UM LOWERCASE LETTER
    if(!this.credentials.password.match("^(?=.*[a-z])")){
      return;
    }
    //PASS TEM DE TER PELO MENOS UM UPPERCASE LETTER
    if(!this.credentials.password.match("^(?=.*[A-Z])")){
      return;
    }


    this.register();
  

  }
  
  register() {
    this.auth.register(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/feed');
    }, (err) => {
      console.error(err);
    });
  }

  /*
  //CRIAR O UTILIZADOR E ATUALIZAR A BD
  criarUtilizador(): void {

    //no caso de sucesso, do lado do backend criar o utilizador com o nome e a pass + valorLogin a 1
    this.autService.addUser(, ththis.nickis.pw).subscribe(out => {
      console.log(out.msg)
      if (out.msg == "SUCESSO REGISTO"){
        
        window.location.href = "http://localhost:4200/feed";


      } else {
        this.listError = [];
        this.listError.push("Nickname já existe!\n");
        this.updateErrorMensage();
      }
    });

  }*/

}
