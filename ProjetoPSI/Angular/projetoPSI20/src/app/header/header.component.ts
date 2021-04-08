import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

export var nick : string;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public nick;
  //vai ter um user
  private menuAberto: boolean = false;

  constructor(public auth: AuthenticationService) { 
    this.nick = "PedroFerreira";
    //this.menuAberto = false;
  }

  //INIT
  ngOnInit(): void {
    document.getElementById("dropbt")!.setAttribute("style","display:none");
    //this.menuAberto = false;
    //document.addEventListener('click', this.closeOnClick.bind(this));

    
    //check if element in focus is of that div, if it isnt change to hidden

    //const elem = document.getElementById('dropbt');
    //if (elem.focus ) {
   //     console.log('Element has focus!');
   // } else {
   //     console.log(`Element is not focused.`);
   // }


    //var aux : boolean = false;
    //document.addEventListener('click', function(event){
    //  const yourContainer = document.getElementById('dropbt');
    //  console.log(
     //    "clicked"
    //  );
    //  if(!yourContainer!.contains(<Node> event.target)) {
    //    yourContainer!.setAttribute("style","display:none");
    //    console.log("escondido");
    //    aux = false;
        
     // }
  // });
    //this.menuAberto = aux;

    /*
    var btn = window.document.getElementById("dropbtno")!;
    var compStyles = window.getComputedStyle(btn)!;
    var compStyles2 = window.getComputedStyle(window.document.getElementById("dropbt")!);

    btn!.addEventListener("keydown", function(event) {
      if(event.which == 13){
        if(compStyles2.getPropertyValue('display') == "none"){
          console.log("none");
          window.document.getElementById("dropbt")!.setAttribute("style","display:block");
        }else{
          console.log("block");
          window.document.getElementById("dropbt")!.setAttribute("style","display:none");
        }
        console.log("entrei");
        //window.document.getElementById("dropbtno")!.setAttribute("style","display:block");
      }
      console.log(event.which);
    })*/
  }

  mudaStyle() : void{
    console.log("clicado");
    var btn = window.document.getElementById("dropbt")!;
    var compStyles = window.getComputedStyle(btn)!;
    console.log(compStyles.getPropertyValue('display'));
    if(compStyles.getPropertyValue('display') == "none"){
      window.document.getElementById("dropbt")!.setAttribute("style","display:block");
    }else{
      window.document.getElementById("dropbt")!.setAttribute("style","display:none");
    }

  }

  openMenu():void{
    console.log("tentar abrir o menu  "  + this.menuAberto);
    if (this.menuAberto == false){
      document.getElementById("dropbt")!.setAttribute("style","display:block");
      this.menuAberto = true;
      console.log("abri");
      //this.closeOutside();
      //document.addEventListener('click', this.closeOutside.bind(this));
    }else{
      document.getElementById("dropbt")!.setAttribute("style","display:none");
      this.menuAberto = false;
      console.log("fechei");
    }
  }

  closeOutside(e : Event):void{
    /*
    console.log(this.menuAberto);
    if(this.menuAberto == true){
        const botaoF = document.getElementById('dropbt');
        //console.log((<Node> botaoF)?.node);
        console.log(botaoF?.children[0].parentElement?.parentElement?.children[0]);
        //console.log((<HTMLElement> e.target).parentNode);

        var target = e.target || e.srcElement;
        while (target && !(<HTMLElement> target).id) {
          target = (<HTMLElement>target).parentNode;
        }
        console.log(target);

        document.addEventListener('click', event => {
          if(botaoF?.children[0].parentElement?.parentElement?.children[0] != target){
            console.log("nao posso entrar");
            const botaoFi = document.getElementById('dropbt');
            botaoFi!.setAttribute("style","display:none");
            this.menuAberto = false;
            console.log("DIFERENTES"); 
          }else{
            console.log("IGUAIS");
          }
      });
        
    }*/
    
  }

  closeOnClick(e : Event) : void{
    //var self = this;
    
    const botaoF = document.getElementById('dropbt');
    //this.openMenu();
    if(this.menuAberto == true){
      console.log("Menu esta aberto " + this.menuAberto);
      console.log(document.getElementById('dropbt')!.style.display);
      console.log((<HTMLInputElement>e.currentTarget).className);
      if(document.getElementById('dropbt')!.style.display == "block"){
        console.log("estou block");
        document.addEventListener('click', event => {
          botaoF!.setAttribute("style","display:none");
          this.menuAberto = false;
       });
      }else{
        //console.log("estou none");
        //botaoF!.setAttribute("style","display:block");
        //this.menuAberto = true;
      }
    
    }
  }

  /*
  logout() {
    this.autService.logout(this.nick).subscribe(out => {
      console.log(out.msg);
      if(out.msg == "SUCESSO LOGOUT"){
        window.location.href = "http://localhost:4200/"; //login
      } else {
        console.log("Falhou LOGOUT");
      }
      
    })
  }*/

}
