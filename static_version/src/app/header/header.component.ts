import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private menuAberto: boolean = false;

  constructor(public auth: AuthenticationService) { 

  }

  //INIT
  ngOnInit(): void {
    if(document.getElementById("dropbt") != null){

      document.getElementById("dropbt")!.setAttribute("style","display:none");
      document.addEventListener('click', this.closeOnClick.bind(this));
    }
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
    }else{
      document.getElementById("dropbt")!.setAttribute("style","display:none");
      this.menuAberto = false;
      console.log("fechei");
    }
  }

  closeOnTab():void{
    const botaoF = document.getElementById('dropbt');
    if(this.menuAberto == true){
      if(botaoF!.style.display == "block"){
        botaoF!.setAttribute("style","display:none");
        this.menuAberto = false;
      }
    }
  }

  closeOnClick(e : Event):void{
    
    const botaoF = document.getElementById('dropbt');

    if(this.menuAberto == true){
      if(document.getElementById('dropbt')!.style.display == "block"){
        console.log("estou block");
      }
    } else{
      console.log("estou none");
      botaoF!.setAttribute("style","display:block");
      this.menuAberto = true;
    }

  }

}
