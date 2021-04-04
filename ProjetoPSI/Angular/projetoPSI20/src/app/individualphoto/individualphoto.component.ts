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
  
  constructor() {
    this.like = "like";
    this.nolike = "nolike";
    this.tipo = "nolike";    
  }

  ngOnInit(): void {
    //let btn = document.getElementById("botaoLike");
    //btn?.addEventListener("click", (e:Event) => this.toggleLike());
  }

  fazerLike(): void {
    this.tipo = "like";
    console.log("fiz like");
  }

  tirarLike(): void {
    this.tipo = "nolike";
    
    console.log("tirei like");
  }

}
