import { Component, OnInit, Output } from '@angular/core';
import { Photo } from '../photo';
import { PhotoService } from '../photo.service';
import { AuthenticationService } from '../authentication.service';
import { ActivatedRoute, Params} from '@angular/router';
import { Router } from '@angular/router';




@Component({
  selector: 'app-individualphoto',
  templateUrl: './individualphoto.component.html',
  styleUrls: ['./individualphoto.component.css']
})
export class IndividualphotoComponent implements OnInit {

  photo?: Photo;
  public like;
  public nolike;
  public tipo;
  //photos : Photo[];

  public fav;
  public nofav;
  public tipoFav;
  public id;
  public textotooltip;
  public copied;

  public nickname;  //id do user a usar a app
  public dono; //dono da foto atual
  public nrLikes;
  public likers : string[];

  public favoritePhotos : string[];

  confirmDelete : boolean;

  //auth.getUserDetails()?.nickname


  constructor(private photoService: PhotoService, private router: Router,public auth : AuthenticationService, private route: ActivatedRoute) {
    this.like = "like";
    this.nolike = "nolike";
    this.tipo = "nolike";

    this.fav = "fav";
    this.nofav = "nofav";
    this.tipoFav = "nofav";
    this.textotooltip = "Copiar link para a clipboard";
    this.copied = false;
    this.nrLikes=0;
    this.likers= [ ];

    this.nickname = auth.getUserDetails()?.nickname;
    this.dono="semdono";
    this.id = "";

    this.favoritePhotos = [];

    this.confirmDelete = false;

    //REFRESH NA BACK
    let perfEntries : any;
    perfEntries = performance.getEntriesByType("navigation");
    if (perfEntries[0].type === "back_forward") {
      location.reload(true);
    }


  }

  //INIT
  ngOnInit(): void {
    let btn1 = document.getElementById("myTooltip")?.setAttribute("style", "visibility: hidden");
    //this.nrLikes = this.photoService.getNrLikes(this.id);

    //document.getElementById("partilhar")!.addEventListener("mouseenter", this.changeTooltip);
    //this.getPhotoById();
    let btn = document.getElementById("partilhar");
    document.getElementById("partilhar")?.addEventListener("mouseover", this.mouseOn, true);
    document.getElementById("partilhar")?.addEventListener("mouseout", this.mouseOut, true);
    document.getElementById("partilharFoto")?.addEventListener("mouseover", this.mouseOn, true);
    document.getElementById("partilharFoto")?.addEventListener("mouseout", this.mouseOut, true);

    this.route.params.subscribe(
      (params: Params) => {
      console.log(params['id']);
      this.id = params['id'];
      }
    );

    // Obter fotos favoritas
    this.photoService.getPhotosFavourited(this.nickname)
        .subscribe(output =>
              {
                this.favoritePhotos = output;
              });

    this.getPhotoById();
  }

  mouseOut(){
    // console.log("not hovered");
    this.copied = false;
    //this.textotooltip = "";
    //let btn = document.getElementById("tooltiptext")?.setAttribute("style", "visibility: hidden");
    //document.getElementById("tooltiptext")!.innerHTML = "Copiar link";

    let btn1 = document.getElementById("myTooltip")?.setAttribute("style", "visibility: hidden");

  }

  mouseOn(){
    // console.log("hovered");
    let btn1 = document.getElementById("myTooltip")?.setAttribute("style", "visibility: visible");
    document.getElementById("myTooltip")!.innerHTML = "Copiar link";

    //this.textotooltip = "Copiar link";
    //let btn = document.getElementById("tooltiptext")?.setAttribute("style", "visibility: visible, position: absolute, z-index: 1, top: -5px, right: -105%");
    //document.getElementById("tooltiptext")!.innerHTML = "Copiar link";
  }

  //AO CLICAR PARA METER LIKE
  fazerLike(): void {
    //SO POSSO FAZER LIKE SE AINDA NAO TIVER FEITO
    if(!this.likers.includes(this.nickname)){
      this.tipo = "like";
      console.log(this.nrLikes);
      //this.nrLikes +=1;
      console.log(this.nrLikes);
      console.log("fiz like");
      this.likeInvoke(this.id);
    }else{
      this.likeInvoke(this.id);
      this.tipo = "like";
      return;
    }
  }


  likeInvoke(idFoto: string) : void {
    console.log("LIKERS: " + this.likers);
    if(this.likers.includes(this.nickname)){
      //const index = this.liked.indexOf(id, 0);
      //if (index > -1) {
      //  this.liked.splice(index, 1);
      //}
      this.photoService.removeLikeToPhoto(idFoto, this.nickname).subscribe(output =>
      {
        console.log(output);
        //this.photos[this.photosId.indexOf(id)] = output;
        this.tipo = "nolike";
        this.likers = output.likes;
        this.nrLikes = output.likes.length - 1;
      });

    } else {
      //this.liked.push(id);
      this.photoService.addLikeToPhoto(idFoto, this.nickname).subscribe(output =>
      {
        console.log(output);
        //this.photos[this.photosId.indexOf(id)] = output;
        this.tipo = "like";
        this.likers = output.likes;
        this.nrLikes = output.likes.length - 1;
      });

    }

  }

  //AO CLICAR PARA TIRA LIKE
  tirarLike(): void {
    console.log("LIKERS: " + this.likers);
    //SO POSSO TIRAR LIKE SE JA TIVER FEITO
    //if(this.likers.includes(this.nickname)){
      this.tipo = "nolike";
      console.log(this.nrLikes);
      //this.nrLikes -=1;
      console.log(this.nrLikes);
      console.log("tirei like");
      this.likeInvoke(this.id);
    //}else{
    //  this.tipo = "nolike";
    //  return;
    //}

  }

  checkLike() : boolean{
    //console.log(this.likers);
    if(this.likers.includes(this.nickname)){
      console.log("JA INCLUO");
      return false;
    }else{
      console.log("NAO INCLUO");
      return true;
    }

  }

  /**
  * Verifica se a foto id é uma das fotos favoritas do cliente corrente
  * @param id identificação da foto
  * @returns True caso seja foto favorita do cliente corrente
  */
  tenhoFavorite(id: string | undefined) : boolean {
    debugger;
    if(id !== undefined) {
      if(this.favoritePhotos.includes(id))
        return true;
      else
        return false;
    }
    return false;
  }

  favoriteInvoke(id: string | undefined) {
    if(id === undefined) {
      return
    }
    if(this.favoritePhotos.includes(id)){
      // Remove Favorite

      // Atualizar página
      window.location.reload();

      window.document.getElementById("favorite"+id)!.setAttribute('src',"assets/favourite.png");    //VERIFICAR SE HA ALGUMA FORMA DE DAR LOAD ANTES (NO INIT)
      const index = this.favoritePhotos.indexOf(id, 0);
      if (index > -1) {
        this.favoritePhotos.splice(index, 1);
      }
      // Atualizar BD
      this.photoService.removeFavoriteToPhoto(id, this.nickname).subscribe(output => {
        console.log(output);
      });

    } else {
      // Add Favorite
      window.document.getElementById("favorite"+id)!.setAttribute('src',"assets/favouriteChecked.png");
      this.favoritePhotos.push(id);
      // Atualizar BD
      this.photoService.addFavoriteToPhoto(id, this.nickname).subscribe(output => {
        console.log(output);
      });
    }


  }

  getPhotoById():void {
    this.photoService.getPhotoById(this.id)?.subscribe(output => {
      //this.photos.push(output);

      if(output != undefined) {
        this.photo = output;

        this.dono = output.dono;
        this.nrLikes = (output.likes.length) - 1;
        this.likers = output.likes;
        console.log(this.likers);
      }

    });
  }

  copyMessage() : void{
    window.document.getElementById("popup")!.style.animation = "";
    const selBox = document.createElement('textarea');
    selBox.value = window.location.href;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);


    this.copied = true;

    window.document.getElementById("popup")!.style.animation = "slideUp 3s 1 linear";
  }

  //tipo do id mudado de string para any
  deletePhoto(id : any) : void{

    if(!this.confirmDelete) {
       window.document.getElementById("deleteConfirmation")!.style.display = "flex";
      window.document.getElementById("deleteConfirmation")!.style.animation = "slideRemove 3s 1 linear";
      return;
    }

    console.log(id);
    this.nickname = this.auth.getUserDetails()?.nickname;
    console.log(this.nickname);
    //alert iwth input answer
    this.photoService.deletePhoto(id+';'+this.auth.getUserDetails()?.nickname).subscribe((out) => {
        console.log("RES:" + out.msg);
      if(out.msg == "SUCESSO APAGAR FOTO"){
        this.router.navigateByUrl('/perfil/' + this.nickname);
      } else {
        console.log("ERRO APAGAR FOTO");
      }
    }, (err) => {
      console.error(err);
    });


  }

  confirmDeletePhoto(id : any) {
    window.document.getElementById("deleteConfirmation")!.style.display = "none";
    this.confirmDelete = true;
    this.deletePhoto(id);
  }

  cancelDeletePhoto() {
    window.document.getElementById("deleteConfirmation")!.style.display = "none";
  }

  goHome() {
    window.location.href ='/';
  }


}
