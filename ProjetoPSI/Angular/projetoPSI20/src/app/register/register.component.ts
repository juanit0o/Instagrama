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
    //this.error = "Nickname must have at least 3 chars." +  '\n' + "Your nickname cannot have special characters." + '\n' + 
    //"Password must be at least 8 chars." + '\n' + "Password must have at least one digit." + '\n' + 
    //"Password must have at least one lowercase letter." + '\n' + "Password must have at least one uppercase letter.";
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
 passwordRegister(pw: string): void {
    this.pw = pw;
  }

  registar(): void {
    //TODO tou ma passar com esta merda, tentar fazer aparecer os requisitos todos (como ele quer) e ir apagando à medida que vai ficando bem construida
    //this.error = "Nickname must have at least 3 chars." +  '\n' + "Your nickname cannot have special characters." + '\n' + 
    //"Password must be at least 8 chars." + '\n' + "Password must have at least one digit." + '\n' + 
    //"Password must have at least one lowercase letter." + '\n' + "Password must have at least one uppercase letter.";

    console.log("ENTREI registar " + this.nick + " " + this.pw);

    //NICK TEM DE TER PELO MENOS 3 CARACTERS
    if(!this.nick || this.nick.length < 3){

      console.log("NICK PEQUENO");
      //if(!this.error.includes("Nickname must have at least 3 chars")){
      //  this.error += "Nickname must have at least 3 chars";
     // }else{return;}

     this.error = "Nickname must have at least 3 chars";
      return;
    }

    /*
    console.log(this.error);
    var temp = this.error.replace("Nickname must have at least 3 chars." + '\n', "");
    this.error = temp;
    console.log(this.error);
    console.log(temp);*/
  

    if(this.nick.match("^(?=.*[@$!%*?&#^-])")){
      //this.error = "Your nickname cannot have special characters";
      console.log("carateres especiais no nome");
     // if(!this.error.includes("Your nickname cannot have special characters")){
     //   this.error += "Your nickname cannot have special characters";
     // }else{}
     this.error = "Your nickname cannot have special characters";
      return;
    }

    /*
    console.log(temp);
    var temp = this.error.replace("Your nickname cannot have special characters." + '\n', "");
    this.error = temp;
    console.log(temp);*/

    //FAZER LOGIN E ENTRAR NO SITE
    //TODO *******************************************************************************************
    if(!this.pw || this.pw.length < 8){
      console.log("PQ PEQUENA");
      //this.error = "Password must be at least 8 chars";
      //if(!this.error.includes("Password must be at least 8 chars")){
      //  this.error += "Password must be at least 8 chars";
     // }else{}
     this.error = "Password must be at least 8 chars";
      return;
    }
    
    	/*
    var temp = this.error.replace("Password must be at least 8 chars." + '\n', "");
    this.error = temp;
     */

 
    //TODO - SEPARAR ISTO 
    //if(!this.pw.match("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$")){
    if(!this.pw.match("^(?=.*[0-9])")){
      console.log("FALTA NRS");
     // this.error = "Password must have at least one digit";
     //if(!this.error.includes("Password must have at least one digit")){
    //  this.error += "Password must have at least one digit";
    //  }else{}
    this.error = "Password must have at least one digit";
      return;
    }
    
    /*
    var temp = this.error.replace("Password must have at least one digit." + '\n', "");
    this.error = temp;
    */
    

    if(!this.pw.match("^(?=.*[a-z])")){
      console.log("FALTA MINSUCULAS");
      //this.error = "Password must have at least one lowercase letter";
     // if(!this.error.includes("Password must have at least one lowercase letter")){
      //  this.error += "Password must have at least one lowercase letter";
      //  }else{}
      this.error = "Password must have at least one lowercase letter";
      return;
    }
    

    /*
    var temp = this.error.replace("Password must have at least one lowercase letter." + '\n', "");
    this.error = temp;
    */

    if(!this.pw.match("^(?=.*[A-Z])")){
      console.log("FALTA MAIUSCULAS");
      this.error = "Password must have at least one uppercase letter";
      //if(!this.error.includes("Password must have at least one uppercase letter")){
      //  this.error += "Password must have at least one uppercase letter";
       // }else{}
      return;
    }

    /*
    var temp = this.error.replace("Password must have at least one uppercase letter.", "");
    this.error = temp;
    console.log(this.error);
    */
    this.error = "";
   // return;

  }

  souFotografo(): void {
    this.tipo = "fotografo";
  }

  souUtilizador(): void {
    this.tipo = "utilizador";
  }

  jaExisto(): boolean {
    //fazer verificacoes na bd para ver se este nickname ja existe
    return false;
  }


}
