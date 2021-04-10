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



  //user?: User;
  public nickname;  //TEMPORARIAMENTE ENQUANTO NAO HA USER (TER ATENCAO AO HTML)
  

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
    
    this.nickname = auth.getUserDetails()?.nickname;
    //this.photos = [];
    //this.photo = null;
    //this.user!.nickname = "NOMEDOUSER";
    this.id = "";     
  }

  //INIT
  ngOnInit(): void {
    let btn1 = document.getElementById("myTooltip")?.setAttribute("style", "visibility: hidden");
    
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
    console.log("not hovered");
    this.copied = false;
    //this.textotooltip = "";
    //let btn = document.getElementById("tooltiptext")?.setAttribute("style", "visibility: hidden");
    //document.getElementById("tooltiptext")!.innerHTML = "Copiar link";

    let btn1 = document.getElementById("myTooltip")?.setAttribute("style", "visibility: hidden");
    document.getElementById("myTooltip")!.innerHTML = "Copy to clipboard";
    
  }

  mouseOn(){
    console.log("hovered");
    let btn1 = document.getElementById("myTooltip")?.setAttribute("style", "visibility: visible");
    document.getElementById("myTooltip")!.innerHTML = "Copiar link";

    //this.textotooltip = "Copiar link";
    //let btn = document.getElementById("tooltiptext")?.setAttribute("style", "visibility: visible, position: absolute, z-index: 1, top: -5px, right: -105%");
    //document.getElementById("tooltiptext")!.innerHTML = "Copiar link";
  }

  //AO CLICAR PARA METER LIKE
  fazerLike(): void {
    this.tipo = "like";
    console.log("fiz like");
  }

  //AO CLICAR PARA TIRA LIKE
  tirarLike(): void {
    this.tipo = "nolike";
    
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
    //console.log(" ID e" + id);
    this.photoService.getPhotoById(this.id).subscribe(output => 
      {
        //this.photos.push(output);
        this.photo = output;
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
    console.log(id);
    console.log(this.auth.getUserDetails()?.nickname);
    
    this.photoService.deletePhoto(id+';'+this.auth.getUserDetails()?.nickname).subscribe((out) => {
        console.log(out.msg);
      if(out.msg == "SUCESSO APAGAR FOTO"){
        this.router.navigateByUrl('/feed');
      } else {
        console.log("ERROUUU");
      }
      
    }, (err) => {
      console.error(err);
    });
  }

}
