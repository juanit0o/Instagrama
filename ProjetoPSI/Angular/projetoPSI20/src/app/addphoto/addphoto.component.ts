import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Photo } from '../photo';
import { PhotoToUpload } from '../photoToUpload';
import { PhotoService } from '../photo.service'
import { AuthenticationService } from '../authentication.service';
import { ConfirmDescriptionComponent } from '../confirm-description/confirm-description.component';

@Component({
  selector: 'app-addphoto',
  templateUrl: './addphoto.component.html',
  styleUrls: ['./addphoto.component.css']
})
export class AddphotoComponent implements OnInit {

  photosToUpload : PhotoToUpload[];
  photosBase : string[];

  uploadForm: FormGroup;

  photos ?: File[];
  filesInput ?: HTMLElement;

  constructor(public fb: FormBuilder, private photoService: PhotoService, private auth : AuthenticationService,
    private cd : ConfirmDescriptionComponent) { 
    this.uploadForm = this.fb.group({
      avatar: [null],
      name: ['']
    })
    this.photosToUpload = [ ];
    this.photosBase = [ ];
  }

  ngOnInit(): void {

  }

  onFileChanged(ev: any): void {
    if((<HTMLInputElement> window.document.getElementById("submitButton")) != null){
      (<HTMLInputElement> window.document.getElementById("submitButton")).disabled = false;
    }
    let file = (ev.target as HTMLInputElement).files;
    for(var i = 0; i < file!.length; i++) {
      this.singleFile(file![i], i);
    }
    
  }

  singleFile(file: any, i: number) : void {
    if(file != null && file.size < 10000000){
        const reader = new FileReader();
        //let fd = new FormData();
        //fd.append('profileImage', file);
        let photo = {"id": this.photosToUpload.length.toString(),
                    "dono": this.auth.getUserDetails()?.nickname.toString(),
                    "nome": file.name.split(".")[0],           //NOME DO FILE
                    "descricao": "",
                    "photo": file,
                    "likes": [""],
                    "favoritos": [""]} as PhotoToUpload;
        let base = "";
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          base = reader.result as string;  
          this.photosBase.push(base);
        }
      
        this.photosToUpload.push(photo);
      } else {
        //TODO --------------------------------- MOSTRA NO UTILIZADOR
        alert("Cant upload this file!");
      }
  }

  submit(): void{
    console.log(this.photosToUpload);
    this.submitSingleFoto(this.photosToUpload);
  }


  confirmNoDescription(nomeFoto : string) {
    this.cd.changeCurrentDescriptionName(nomeFoto);

    (<HTMLInputElement> window.document.getElementsByClassName("description")[0]).style.visibility = "visible";

    this.cd.getConfirmation().subscribe(() => { 
      console.log(this.cd.checkConfirmation());
    })
  }


  submitSingleFoto(photos : PhotoToUpload[]) : void {
    if(photos && photos.length > 0) {
      let nome = (<HTMLInputElement> window.document.getElementById("nomeFoto"+photos[0].id)).value;
      if (nome != "") {
        photos[0].nome = nome;
      }
      photos[0].descricao = (<HTMLInputElement> window.document.getElementById("descFoto"+photos[0].id)).value;

      if (photos[0].descricao == "") {
        this.confirmNoDescription(photos[0].nome);
      }

      let fd = new FormData();

      //Get last photo id
      this.photoService.getLastId().subscribe(res => {
        
        
        //In case getLastId() fails  
        //Buscar elemento "failed" da foto corrente    
        let listFailed  = window.document.getElementsByClassName("failed");
        let failed : HTMLInputElement | undefined = undefined;
        for (var i = 0; i < listFailed.length; i++) {
          if(listFailed[i].id === photos[0].id) {
            failed = (<HTMLInputElement> listFailed[i]);
          }
        }


        //Buscar elemento "loading" da foto corrente
        let listLoading  = window.document.getElementsByClassName("loading");
        let loading : HTMLInputElement | undefined = undefined;
        for (var i = 0; i < listLoading.length; i++) {
          if(listLoading[i].id === photos[0].id) {
             loading = (<HTMLInputElement> listLoading[i]);

             //Mostrar foto load
             loading.style.display = "grid";
          }
        }


        //Se erro a buscar id
        if(res.msg == "FAILED") {
          console.log("FAILED ID");
         
            //Mostrar erro
            if(failed !== undefined) {
              failed.style.display = "grid";
            }

            if(loading !== undefined) {
              loading.style.display = "none";
            }          

            return;
        }
        

        fd.append('profileImage', photos[0].photo, 'photo_' + res.msg + '.jpg');

        this.photoService.postOnlyPhoto(fd).subscribe(res2 => {
          

          console.log(res.msg);
          if(res.msg == "FAILED") {
            console.log("FAILED PHOTO");

            //Mostrar erro
            if(failed !== undefined) {
              failed.style.display = "grid";
            }

            if(loading !== undefined) {
              loading.style.display = "none";
            }          

            return;
          }

          //Buscar elemento "loading" da foto corrente
          let listSuccess  = window.document.getElementsByClassName("success");
          let success : HTMLInputElement;
          for (var i = 0; i < listSuccess.length; i++) {
            if(listSuccess[i].id === photos[0].id) {
              success = (<HTMLInputElement> listSuccess[i]);
              //Retirar loading
              loading!.style.display = "none";
              //Mostrar sucesso
              success.style.display = "grid";
            }
          }

          
          let photoInfo = {"id": photos[0].id,
                      "dono": photos[0].dono,
                      "nome": photos[0].nome,
                      "descricao": photos[0].descricao,
                      "photo": res2.msg,
                      "likes": photos[0].likes,
                      "favoritos": photos[0].favoritos} as Photo;

          this.photoService.postPhotoInfo(photoInfo).subscribe( res3 =>{
            console.log(res3);
            this.submitSingleFoto(photos.slice(1, photos.length));
          });

        });
        
      });
    }
    
  }

  removePhoto(id: string) : void {
    if (parseInt(id) > -1) {
      
      let photosToUploadAux = [ ];
      for(let i = 0; i < this.photosToUpload.length; i++) {
        if(this.photosToUpload[i].id != id ){
          photosToUploadAux.push(this.photosToUpload[i]);
        }
      }
      this.photosToUpload = photosToUploadAux;
      for(let i = 0; i < this.photosToUpload.length; i++) {
        this.photosToUpload[i].id = i.toString();
      }
    }
    this.temErro();
  }

  checkNomeDescricao(id : string): void {
    if((<HTMLInputElement> window.document.getElementById("nomeFoto"+id)).value.length > 100){
      (<HTMLInputElement> window.document.getElementById("errorMsg"+id)).innerHTML = "Nome deve ser inferior a 100 caracteres\n";
      (<HTMLInputElement> window.document.getElementById("submitButton")).disabled = true;
    } else if((<HTMLInputElement> window.document.getElementById("descFoto"+id)).value.length > 500){
      (<HTMLInputElement> window.document.getElementById("errorMsg"+id)).innerHTML = "Descrição deve ser inferior a 500 caracteres";
      (<HTMLInputElement> window.document.getElementById("submitButton")).disabled = true;
    } else {
      (<HTMLInputElement> window.document.getElementById("errorMsg"+id)).innerHTML = "";
      (<HTMLInputElement> window.document.getElementById("submitButton")).disabled = false;
    }
  }

  temErro() : boolean {
    for(var i = 0; i < this.photosToUpload.length; ++i){
      if((<HTMLInputElement> window.document.getElementById("descFoto"+i)).value.length > 500 ||
        (<HTMLInputElement> window.document.getElementById("nomeFoto"+i)).value.length > 100){
        (<HTMLInputElement> window.document.getElementById("submitButton")).disabled = true;
        return true;
      }
    }
    (<HTMLInputElement> window.document.getElementById("submitButton")).disabled = false;
    return false;
  }

  openPhoto(id : string) : string{
    return this.photosBase[parseInt(id)];
  }

  temPhoto(id : string) : boolean {
    return this.photosBase.length - 1 >= parseInt(id);
  }

  
}
