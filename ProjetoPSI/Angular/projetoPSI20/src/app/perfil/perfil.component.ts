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

  constructor(
    private photoService: PhotoService, public auth: AuthenticationService,
     private route: ActivatedRoute,
  ) {
    // TODO: verificar se eh necessario o uso do auth

    this.photos = [];
    this.liked = [];
    this.favorited = [];
    this.nickname = this.route.snapshot.paramMap.get("nickname");

    this.answerReceived = false;
    this.userExists = false;
    this.auth.userExists(this.nickname!).subscribe(res => {this.userExists = res.msg == "EXISTS"
    this.answerReceived = true;
    });




   }

  //INIT
  ngOnInit(): void {
    this.getPhotosOfUser();
  }

  getPhotosOfUser(): void {
    this.photoService.getPhotosByUserId(this.nickname as string).subscribe(response => {
      for(var i = 0; i < response.length; ++i){
        this.photoService.getPhotoById(response[i].id)?.subscribe(output => {
            if(output != undefined) {
              this.photos.push(output);
            }
        });
      }
    });
  }

  likeInvoke(photo: Photo) {
    if(photo.likes.includes(this.nickname as string)){
      // Remover like

      // Unlike foto com id passado
      window.document.getElementById("like"+photo.id)!.setAttribute('src',"assets/heart.png");

      // Remove id da lista de likes
      const index = this.liked.indexOf(photo.id, 0);
      if (index > -1) {
        this.liked.splice(index, 1);
      }

      // Remove id da lista de likes da foto
      const indexId = photo.likes.indexOf(this.nickname as string, 0);
      if (indexId > -1) {
        photo.likes.splice(indexId, 1);
      }

      // Atualizar número de likes mostrado
      window.document.getElementById("numberLikes"+photo.id)!.innerHTML = (parseInt(window.document.getElementById("numberLikes"+photo.id)!.innerHTML) - 1).toString();

      // Atualizar BD
      this.photoService.removeLikeToPhoto(photo.id, this.nickname as string);
      console.log(photo.likes);


    } else {
      console.log(photo.likes);
      // Adicionar like

      // Sanitize the list photos.likes
      // No caso em que a primeira posição seja ""
      if(photo.likes[0] == "") {
        photo.likes.splice(0, 1);
      }

      // Like foto com id passado
      window.document.getElementById("like"+photo.id)!.setAttribute('src',"assets/likebutton.png");

      // Atualizar lista de fotos curtidas
      this.liked.push(photo.id);

      // Adicionar cliente corrente a lista de usuários que curtiram a foto
      photo.likes.push(this.nickname as string);

      // Atualizar número de likes mostrado
      window.document.getElementById("numberLikes"+photo.id)!.innerHTML = (parseInt(window.document.getElementById("numberLikes"+photo.id)!.innerHTML) + 1).toString();

      // Atualizar BD
      this.photoService.addLikeToPhoto(photo.id, this.nickname as string);

      console.log(photo.likes);
    }

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

}
