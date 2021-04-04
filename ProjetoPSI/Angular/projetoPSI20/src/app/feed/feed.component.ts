import { Component, OnInit } from '@angular/core';

import { Photo } from '../photo';
import { PhotoService } from '../photo.service'

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  //LISTA DE FOTOS
  photos : Photo[];
  liked: string[];
  favorited: string[];

  //ELEMENTO SELECIONADO ATUALMENTE NO "ORDENA POR"
  ordena : string;

  tab : boolean;

  constructor(
    private photoService: PhotoService,
  ) { 

    this.photos = [];

    this.liked = [];
    this.favorited = [];

    this.tab = false;
    this.ordena = "Mais Recentes V"

  }

  //INIT
  ngOnInit(): void {

    this.getPhotos();

    //TODO DAR LOAD DOS LIKES E FAVORITOS
    
  }

  //OBTEM AS FOTOS QUE EXISTEM (POR ORDEM "MAIS RECENTES")
  getPhotos(): void {
    //TODO MUDAR ESTE LOAD PARA DAR LOAD DE UMA PHOTO DE CADA VEZ (MAIS RAPIDO DO QUE DAR LOAD DE TUDO DE UMA VEZ)
    /**this.photoService.getPhotos().subscribe(response => 
      {
        this.photos = response.map( item => 
        {
          return item;
        });
      });*/

      this.photoService.getPhotosIds().subscribe(response => 
        {
          for(var i = 0; i < response.length; ++i){
            this.photoService.getPhotoById(response[i].id).subscribe(output => 
              {
                this.photos.push(output);
              });
          }
        });

  }

  

  //QUANDO E CLICADO NUMA FOTO, ABRIR FOTO INDIVIDUAL
  openPhoto(id: string) {
    console.log(id);
    //let a = (document.getElementById(id) as HTMLInputElement);
    //a.href = "/foto/" + id;
  }

  likeInvoke(id: string) {
    if(this.liked.includes(id)){
      window.document.getElementById("like"+id)!.setAttribute('src',"assets/heart.png");
      const index = this.liked.indexOf(id, 0);
      if (index > -1) {
        this.liked.splice(index, 1);
      }
    } else {
      window.document.getElementById("like"+id)!.setAttribute('src',"assets/likebutton.png");
      this.liked.push(id);
    }

    //TODO ATUALIZAR BD

  }

  favoriteInvoke(id: string) {
    if(this.favorited.includes(id)){
      window.document.getElementById("favorite"+id)!.setAttribute('src',"assets/favourite.png");    //VERIFICAR SE HA ALGUMA FORMA DE DAR LOAD ANTES (NO INIT)
      const index = this.favorited.indexOf(id, 0);
      if (index > -1) {
        this.favorited.splice(index, 1);
      }
    } else {
      window.document.getElementById("favorite"+id)!.setAttribute('src',"assets/favouriteChecked.png");
      this.favorited.push(id);
    }

    //TODO ATUALIZAR BD
  }

  //CASO SE ALTERE O CAMPO "ORDENAR POR"
  ordenaMuda(text: string) {
    this.ordena = text + " V";
    this.tab = false;
  }

  disableFocus() {
    console.log("DISABLE");
    if(this.tab){
      this.tab = false;
    }
  }
  //QUANDO CLICADO NO ORDENA
  ordenaFocus() {
    console.log("FOCUS")
    if(this.tab){
      this.tab = false;
    } else {
      this.tab = true;
    }
  }
  

}
 