import { Component, OnInit } from '@angular/core';
import { Photo } from '../photo';
import { PhotoService } from '../photo.service'
import { ActivatedRoute, Params} from '@angular/router';
import { User } from '../user';

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

  //user?: User;
  public nick;  //TEMPORARIAMENTE ENQUANTO NAO HA USER (TER ATENCAO AO HTML)
  
  constructor(private photoService: PhotoService, private route: ActivatedRoute) {
    this.like = "like";
    this.nolike = "nolike";
    this.tipo = "nolike";

    this.fav = "fav";
    this.nofav = "nofav";
    this.tipoFav = "nofav";
    
    this.nick = "TEMPORARIOFOTOGRAfo"
    //this.photos = [];
    //this.photo = null;
    //this.user!.nickname = "NOMEDOUSER";
    this.id = "";     
  }

  //INIT
  ngOnInit(): void {
    //let btn = document.getElementById("botaoLike");
    //btn?.addEventListener("click", (e:Event) => this.toggleLike());
    //this.getPhotoById();
    
    this.route.params.subscribe(
      (params: Params) => {
      console.log(params['id']);
      this.id = params['id'];
     
      }
    );

    this.getPhotoById();

    console.log(window.location.href);

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
    window.alert("O link para a fotografia foi copiado para a área de transferência!");
  }

}
