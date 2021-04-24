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
  nickNameExists: boolean;
  public passwordNeeds;
  public erroRegistar;
  public teste;

  constructor(private auth: AuthenticationService, private router: Router) { 
    this.error = "";
    this.listError = [];
    this.nickNameExists = false;
    this.passwordNeeds = "Requisitos registo:\n"+"Nickname deve ter pelo menos 3 caracteres\n"+
    "Password deve ter no mínimo 8 caracteres\n"+
    "Password deve ter no mínimo 1 dígito\n"+
    "Password deve ter pelo menos uma letra minúscula\n"+
    "Password deve ter pelo menos uma letra maiúscula\n";
    this.erroRegistar = "\n";
    this.teste = "";
  }

  //INIT
  ngOnInit(): void {
    //this.nicknameRegister();
    //this.passwordRegister();
  }
 
  //ATUALIZA O NICK QUANDO O INPUT É ALTERADO
  nicknameRegister(): void {
    //this.credentials.nickname = nick;


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
    this.teste = "";
    //NICK TEM DE TER PELO MENOS 3 CARACTERS
    if(!this.credentials.nickname || this.credentials.nickname.length < 3){
      this.erroRegistar = this.error;
      console.log(this.erroRegistar);
      return;
    }

    //NICK NAO PODE TER CHARS ESPECIAIS
    if(this.credentials.nickname.match("^(?=.*[@$!%*?&#^-])")){
      this.erroRegistar = this.error;
      return;
    }

    //PASS TEM DE TER PELO MENOS 8 CHARS
    if(!this.credentials.password || this.credentials.password.length < 8){
      this.erroRegistar = this.error;
      return;
    }

    //PASS TEM DE TER PELO MENOS UM DIGITO
    if(!this.credentials.password.match("^(?=.*[0-9])")){
      this.erroRegistar = this.error;
      return;
    }

    //PASS TEM DE TER PELO MENOS UM LOWERCASE LETTER
    if(!this.credentials.password.match("^(?=.*[a-z])")){
      this.erroRegistar = this.error;
      return;
    }

    //PASS TEM DE TER PELO MENOS UM UPPERCASE LETTER
    if(!this.credentials.password.match("^(?=.*[A-Z])")){
      this.erroRegistar = this.error;
      return;
    }
    
    
    this.auth.userExists(this.credentials.nickname!).subscribe(res => {
      console.log(res);
      if(res.msg == "EXISTS"){
        this.erroRegistar="";
        this.teste = "Nickname já existe!";
        return;
      }
      this.register();
    });
  }
  
  register() {
    this.auth.register(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/feed');
    }, (err) => {
      console.error(err);
    });
  }

  
}
