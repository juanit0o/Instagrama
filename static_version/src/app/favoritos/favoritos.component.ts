import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Photo } from '../photo';
import { PhotoService } from '../photo.service'
import { AuthenticationService, UserDetails } from '../authentication.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {

  photos : Photo[];
  photosId : string[];
  liked: string[];
  favorited: string[];
  userExists : boolean;
  answerReceived : boolean;
  details: UserDetails;
  subscription?: Subscription;

  //ELEMENTO SELECIONADO ATUALMENTE NO "ORDENA POR"
  ordena : string;

  temFotosPorLoad ?: boolean;

  naoTemPhoto: boolean;

  constructor(
    private photoService: PhotoService,
    public auth: AuthenticationService
  ) {

    //REFRESH NA BACK
    let perfEntries : any;
    perfEntries = performance.getEntriesByType("navigation");
    if (perfEntries[0].type === "back_forward") {
      location.reload(true);
    }

    this.photos = [];
    this.photosId = [];
    this.liked = [];
    this.favorited = [];

    this.answerReceived = false;
    this.userExists = false;
    this.answerReceived = true;
    this.details = {_id: "",
                     nickname: "",
                     exp: 0,
                     iat: 0 };

    this.ordena = "Mais Recentes V";
    this.temFotosPorLoad = true;

    this.naoTemPhoto = false;

  }

  //INIT
  ngOnInit(): void {
    this.auth.profile().subscribe(user => {
          this.details = user;
          this.getPhotos();
        }, (err) => {

        });

    console.log("length: " + this.photos.length);

  }

  // Obtem as fotos favoritas do cliente corrente
  getPhotos(): void {

    this.subscription = this.photoService.getPhotosFavourited(this.details.nickname).subscribe(response =>
      {
        if(response == null || response.length <= 0) {
          this.naoTemPhoto = true;
        }

        for(var i = 0; i < response.length; ++i){
          this.photosId.push(response[i]);
        }

        this.getPhoto(this.photosId);
      });
  }

  getPhoto(lista: string[]): void {
    if(lista.length > 0){

        this.subscription = this.photoService.getPhotoById(lista[0])?.subscribe(output =>
        {
          if(output != undefined) {
            this.photos.push(output);

            //TENHO LIKE??
            if(output.likes.includes(this.details.nickname)){
              this.liked.push(output.id);
            }

            this.getPhoto(lista.slice(1, lista.length));
          }

      });
    } else {
      this.temFotosPorLoad = false;
      return;
    }
  }

  likeInvoke(id: string) : void {
    if(this.liked.includes(id)){
      const index = this.liked.indexOf(id, 0);
      if (index > -1) {
        this.liked.splice(index, 1);
      }
      this.photoService.removeLikeToPhoto(id, this.details.nickname).subscribe(output =>
      {
        this.photos[this.photosId.indexOf(id)] = output;
      });
    } else {
      this.liked.push(id);
      this.photoService.addLikeToPhoto(id, this.details.nickname).subscribe(output =>
      {
        this.photos[this.photosId.indexOf(id)] = output;
      });
    }
  }

  tenhoLike(id: string) : boolean {
    for(var i = 0; i <this.photos.length; i++){
      if(this.photos[i].likes.includes(this.details.nickname) && this.photos[i].id == id)
        return true;
    }
    return false;
  }

  favoriteInvoke(id: string) {
    if(this.photosId.includes(id)){
      // Remove Favorite

      // Atualizar página
      window.location.reload();

      window.document.getElementById("favorite"+id)!.setAttribute('src',"assets/favourite.png");
      const index = this.photosId.indexOf(id, 0);
      if (index > -1) {
        this.photosId.splice(index, 1);
      }
      // Atualizar BD
      this.photoService.removeFavoriteToPhoto(id, this.details.nickname).subscribe(output => {
        console.log(output);
      });

    } else {
      // Add Favorite
      window.document.getElementById("favorite"+id)!.setAttribute('src',"assets/favouriteChecked.png");
      this.photosId.push(id);
      // Atualizar BD
      this.photoService.addFavoriteToPhoto(id, this.details.nickname).subscribe(output => {
        console.log(output);
      });
    }

  }

  voltarTopo(): void {
    window.document.body.scrollTop = 0;
    window.document.documentElement.scrollTop = 0;
  }

}


