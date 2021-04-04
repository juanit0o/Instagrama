import { Component, OnInit } from '@angular/core';
import { Photo } from '../photo';

@Component({
  selector: 'app-individualphoto',
  templateUrl: './individualphoto.component.html',
  styleUrls: ['./individualphoto.component.css']
})
export class IndividualphotoComponent implements OnInit {

  public Photo?: Photo;
  public like;
  public nolike;
  public tipo;
  
  public fav;
  public nofav;
  public tipoFav;
  
  constructor() {
    this.like = "like";
    this.nolike = "nolike";
    this.tipo = "nolike";

    this.fav = "fav";
    this.nofav = "nofav";
    this.tipoFav = "nofav";      
  }

  //INIT
  ngOnInit(): void {
    //let btn = document.getElementById("botaoLike");
    //btn?.addEventListener("click", (e:Event) => this.toggleLike());
  }

  //AO CLICAR PARA METER LIKE
  fazerLike(): void {
    this.tipo = "like";
    console.log("fiz like");
  }

  //AO CLICAR PARA TIRA LIKE
  tirarLike(): void {
    this.tipo = "nolike";
    
    console.log("tirei like");
  }

  fazerFav(): void {
    this.tipoFav = "fav";
    console.log("fiz fav");
  }

  tirarFav(): void {
    this.tipoFav = "nofav";
    
    console.log("tirei fav");
  }



}
