import { Component, OnInit, Directive, ElementRef } from '@angular/core';
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
  details: UserDetails;

  subscription?: Subscription;
  photos : Photo[];
  photosId : string[];
  liked: string[];
  favorited: string[];

  //ELEMENTO SELECIONADO ATUALMENTE NO "ORDENA POR"
  ordena : string;

  temFotosPorLoad ?: boolean;

  constructor(
    private photoService: PhotoService,
    private auth: AuthenticationService,
    { nativeElement }: ElementRef<HTMLImageElement>
  ) {

    //REFRESH NA BACK
    let perfEntries : any;
    perfEntries = performance.getEntriesByType("navigation");
    if (perfEntries[0].type === "back_forward") {
      location.reload(true);
    }

    this.details = {_id: "",
                    nickname: "",
                    exp: 0,
                    iat: 0 };

    this.photos = [];
    this.photosId = [];

    this.liked = [];
    this.favorited = [];

    this.ordena = "Mais Recentes V";
    this.temFotosPorLoad = true;

    const supports = 'loading' in HTMLImageElement.prototype;
    if (supports) {
      nativeElement.setAttribute('loading', 'lazy');
    }

  }

  //INIT
  ngOnInit(): void {

   this.auth.profile().subscribe(user => {
          this.details = user;
          this.getPhotos();

          // Obter fotos favoritas do cliente corrente
          this.subscription = this.photoService.getPhotosFavourited(this.details.nickname).subscribe(response =>
            {
              for(var i = 0; i < response.length; ++i){
                this.favorited.push(response[i]);
              }
            });
        }, (err) => {

        });
  }

  //OBTEM AS FOTOS QUE EXISTEM (POR ORDEM "MAIS RECENTES")
  getPhotos(): void {
      this.subscription = this.photoService.getPhotosIdsRecentes().subscribe(response =>
        {
          for(var i = 0; i < response.length; ++i){
            this.photosId.push(response[i].id);
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


  favoriteInvoke(id: string) {
    if(this.favorited.includes(id)){
      window.document.getElementById("favorite"+id)!.setAttribute('src',"assets/favourite.png");    //VERIFICAR SE HA ALGUMA FORMA DE DAR LOAD ANTES (NO INIT)
      const index = this.favorited.indexOf(id, 0);
      if (index > -1) {
        this.favorited.splice(index, 1);
      }
      this.photoService.removeFavoriteToPhoto(id, this.details.nickname).subscribe(output => {
        console.log(output);
      });
    } else {
      window.document.getElementById("favorite"+id)!.setAttribute('src',"assets/favouriteChecked.png");
      this.favorited.push(id);
      this.photoService.addFavoriteToPhoto(id, this.details.nickname).subscribe(output => {
        console.log(output);
      });
    }

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

          this.subscription = this.photoService.getPhotosIdsLikes().subscribe(response =>
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
  }

}
