import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Photo } from '../photo';
import { PhotoService } from '../photo.service';

import { AuthenticationService, UserDetails } from '../authentication.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  //LISTA DE FOTOS

  //nickname : string;

  details: UserDetails;

  subscription?: Subscription;
  photos : Photo[];
  photosId : string[];
  liked: string[];
  favorited: string[];
  //

  //ELEMENTO SELECIONADO ATUALMENTE NO "ORDENA POR"
  ordena : string;

  temFotosPorLoad ?: boolean;

  constructor(
    private photoService: PhotoService,
    private auth: AuthenticationService
  ) { 

    this.details = {_id: "",
                    nickname: "",
                    exp: 0,
                    iat: 0 };
    //this.nickname = this.autenticacaoService.getNick();
    //console.log(this.nickname);
    this.photos = [];
    this.photosId = [];

    this.liked = [];
    this.favorited = [];

    this.ordena = "Mais Recentes V";


    
  }

  //INIT
  ngOnInit(): void {

   this.auth.profile().subscribe(user => {
          this.details = user;
        }, (err) => {
          //console.error(err);
        });


    this.getPhotos();

    //TODO DAR LOAD DOS LIKES E FAVORITOS
    
  }

  //OBTEM AS FOTOS QUE EXISTEM (POR ORDEM "MAIS RECENTES")
  getPhotos(): void {
      this.subscription = this.photoService.getPhotosIdsRecentes().subscribe(response => 
        {
          for(var i = 0; i < response.length; ++i){
            this.photosId.push(response[i].id)
          }
          this.getPhoto(this.photosId);
        });
  }
  
  getPhoto(lista: string[]): void {
    if(lista.length > 0){

        this.subscription = this.photoService.getPhotoById(lista[0]).subscribe(output => 
        {
          this.photos.push(output);
            this.getPhoto(lista.slice(1, lista.length));
      });
    } else {
      this.temFotosPorLoad = false;
      return;
    }
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

  onChange(deviceValue : string) : void  {
    this.photos = [];
    this.photosId = [];
    if(this.subscription)
      this.subscription.unsubscribe();
    switch (deviceValue){
      case "Mais Antigas":
          this.subscription = this.photoService.getPhotosIdsAntigas().subscribe(response => 
            {
              for(var i = 0; i < response.length; ++i){
                this.photosId.push(response[i].id)
              }
              this.getPhoto(this.photosId);
        });
        break;
      case "Mais Likes":
          this.subscription = this.photoService.getPhotosIdsAntigas().subscribe(response => 
            {
              for(var i = 0; i < response.length; ++i){
                this.photosId.push(response[i].id)
              }
              this.getPhoto(this.photosId);
        });
        break;

      default:
          this.subscription = this.photoService.getPhotosIdsRecentes().subscribe(response => 
            {
              for(var i = 0; i < response.length; ++i){
                this.photosId.push(response[i].id)
              }
              this.getPhoto(this.photosId);
        });
        break;
  }
    }
      
    voltarTopo(): void {
      window.document.body.scrollTop = 0;
      window.document.documentElement.scrollTop = 0;
      //window.document.querySelector("app-header")?.focus();
    }


        

}
 