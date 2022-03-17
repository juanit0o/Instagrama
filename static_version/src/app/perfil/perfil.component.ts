import { Component, OnInit } from '@angular/core';

import { Photo } from '../photo';
import { PhotoService } from '../photo.service'
import { AuthenticationService } from '../authentication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  photos : Photo[];
  liked: string[];
  favorited: string[];
  nickname : string | null;
  userExists : boolean;
  answerReceived : boolean;
  photosId: string[];

  naoTemPhoto: boolean;

  constructor(
    private photoService: PhotoService, public auth: AuthenticationService,
     private route: ActivatedRoute,
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
    this.nickname = this.route.snapshot.paramMap.get("nickname");

    this.answerReceived = false;
    this.userExists = false;
    this.auth.userExists(this.nickname!).subscribe(res => {this.userExists = res.msg == "EXISTS"
      this.answerReceived = true;
    });

    this.naoTemPhoto = false;

   }

  //INIT
  ngOnInit(): void {
    this.getPhotosOfUser();
    
    // Obter fotos favoritas do cliente corrente
    this.photoService.getPhotosFavourited(this.nickname as string).subscribe(response =>
      {
        for(var i = 0; i < response.length; ++i){
          this.favorited.push(response[i]);
        }
      });
    
  }

  getPhotosOfUser(): void {
    this.photoService.getPhotosByUserId(this.nickname as string).subscribe(response => {
      if(response == null || response.length <= 0) {
        this.naoTemPhoto = true;
      }
      for(var i = 0; i < response.length; ++i){
        this.photosId.push(response[i].id);
      }
      this.getPhoto(this.photosId);
    });
  }

  getPhoto(lista: string[]): void {
      this.photoService.getPhotoById(lista[0])?.subscribe(output =>
      {
        if(output != undefined) {
          this.photos.push(output);

          //TENHO LIKE??
          if(output.likes.includes(this.nickname as string)){
            this.liked.push(output.id);
          }

          this.getPhoto(lista.slice(1, lista.length));
        }

    });
  }



  likeInvoke(id: string) : void {

    if(this.liked.includes(id)){
      const index = this.liked.indexOf(id, 0);
      if (index > -1) {
        this.liked.splice(index, 1);
      }
      this.photoService.removeLikeToPhoto(id, this.nickname as string).subscribe(output =>
      {
        this.photos[this.photosId.indexOf(id)] = output;
      });
    } else {
      this.liked.push(id);
      this.photoService.addLikeToPhoto(id, this.nickname as string).subscribe(output =>
      {
        this.photos[this.photosId.indexOf(id)] = output;
      });
    }
  }

  favoriteInvoke(id: string) {
    if(this.favorited.includes(id)){
      window.document.getElementById("favorite"+id)!.setAttribute('src',"assets/favourite.png");
      const index = this.favorited.indexOf(id, 0);
      if (index > -1) {
        this.favorited.splice(index, 1);
      }
      this.photoService.removeFavoriteToPhoto(id, this.nickname as string).subscribe(output => {
        console.log(output);
      });
    } else {
      window.document.getElementById("favorite"+id)!.setAttribute('src',"assets/favouriteChecked.png");
      this.favorited.push(id);
      this.photoService.addFavoriteToPhoto(id, this.nickname as string).subscribe(output => {
        console.log(output);
      });
    }
  }

  tenhoLike(id: string) : boolean {
    for(var i = 0; i <this.photos.length; i++){
      if(this.photos[i].likes.includes(this.nickname as string) && this.photos[i].id == id)
        return true;
    }
    return false;
  }

  /**
   * Verifica se a foto id é uma das fotos favoritas do cliente corrente
   * @param id identificação da foto
   * @returns True caso seja foto favorita do cliente corrente
   */
   tenhoFavorite(id: string) : boolean {
    if(this.favorited.includes(id))
      return true;
    else
      return false;
  }

}
