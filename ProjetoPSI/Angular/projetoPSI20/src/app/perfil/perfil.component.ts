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

}
