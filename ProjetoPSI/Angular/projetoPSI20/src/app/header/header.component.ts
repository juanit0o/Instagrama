import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public nick;
  //vai ter um user

  constructor() { 
    this.nick = "PedroFerreira";
  }

  //INIT
  ngOnInit(): void {
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

}
