import { Component, OnInit } from '@angular/core';
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

  confirmDelete : boolean;

  //auth.getUserDetails()?.nickname


  constructor(private photoService: PhotoService, private router: Router,private auth : AuthenticationService, private route: ActivatedRoute) {
    this.like = "like";
    this.nolike = "nolike";
    this.tipo = "nolike";

    this.fav = "fav";
    this.nofav = "nofav";
    this.tipoFav = "nofav";
    this.textotooltip = "Copiar link para a clipboard";
    this.copied = false;
    this.nrLikes = 0;
    
    this.nickname = auth.getUserDetails()?.nickname;
    this.dono="semdono";
    //this.photos = [];
    //this.photo = null;
    //this.user!.nickname = "NOMEDOUSER";
    this.id = "";

    this.confirmDelete = false;
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

    this.getPhotoById();

    console.log(window.location.href);
    
  }

  mouseOut(){
    // console.log("not hovered");
    this.copied = false;
    //this.textotooltip = "";
    //let btn = document.getElementById("tooltiptext")?.setAttribute("style", "visibility: hidden");
    //document.getElementById("tooltiptext")!.innerHTML = "Copiar link";

    let btn1 = document.getElementById("myTooltip")?.setAttribute("style", "visibility: hidden");
    document.getElementById("myTooltip")!.innerHTML = "Copy to clipboard";
    
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
    this.tipo = "like";
    console.log(this.nrLikes);
    this.nrLikes +=1;
    console.log(this.nrLikes);
    console.log("fiz like");
  }

  //AO CLICAR PARA TIRA LIKE
  tirarLike(): void {
    this.tipo = "nolike";
    console.log(this.nrLikes);
    this.nrLikes -=1;
    console.log(this.nrLikes);
    
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

  getPhotoById():void {
    console.log(" ID FOTO::" + this.id);
    this.photoService.getPhotoById(this.id).subscribe(output => {
      //this.photos.push(output);
      this.photo = output;
      this.dono = output.dono;
      this.nrLikes = (output.likes.length) - 1;
      console.log(this.nrLikes);
    });
  }

  copyMessage() : void{
    window.document.getElementById("popup")!.style.animation = "";
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = window.location.href;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    console.log("copiado");

    
    //var tooltip = document.getElementById("myTooltip");
    // tooltip!.innerHTML = "Copiado!";

    //this.textotooltip = "Link copiado";
    //document.getElementById("tooltiptext")!.innerHTML = "Link copiado";
    this.copied = true;
    //window.alert("O link para a fotografia foi copiado para a área de transferência!");
    
    window.document.getElementById("popup")!.style.animation = "slideDown 3s 1 linear";
  }

  //tipo do id mudado de string para any
  deletePhoto(id : any) : void{
    if(!this.confirmDelete) {
      (<HTMLInputElement> window.document.getElementsByClassName("deleteConfirmation")[0]).style.display = "flex";

      return;
    }

    console.log(id);
    console.log(this.auth.getUserDetails()?.nickname);
    //alert iwth input answer
    this.photoService.deletePhoto(id+';'+this.auth.getUserDetails()?.nickname).subscribe((out) => {
        console.log(out.msg);
      if(out.msg == "SUCESSO APAGAR FOTO"){
        this.router.navigateByUrl('/feed');
      } else {
        console.log("ERRO APAGAR FOTO");
      }
    }, (err) => {
      console.error(err);
    });
  }

  confirmDeletePhoto(id : any) {
    console.log("CONFIRM DELETE");
    this.confirmDelete = true;
    this.deletePhoto(id);
  }

  cancelDeletePhoto() {
    console.log("CANCEL DELETE");
    (<HTMLInputElement> window.document.getElementsByClassName("deleteConfirmation")[0]).style.display = "none";
  }

}
