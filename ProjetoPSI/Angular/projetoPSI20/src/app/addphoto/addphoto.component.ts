import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Photo } from '../photo';
import { PhotoToUpload } from '../photoToUpload';
import { PhotoService } from '../photo.service'
import { AuthenticationService } from '../authentication.service';

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

  isSubmit : boolean;

  constructor(public fb: FormBuilder, private photoService: PhotoService, private auth : AuthenticationService) { 
    this.uploadForm = this.fb.group({
      avatar: [null],
      name: ['']
    })
    this.photosToUpload = [ ];
    this.photosBase = [ ];
    this.isSubmit = false;
  }

  ngOnInit(): void {

  }

  onFileChanged(ev: any): void {

    if(!this.isSubmit){
      if((<HTMLInputElement> window.document.getElementById("submitButton")) != null){
        (<HTMLInputElement> window.document.getElementById("submitButton")).disabled = false;
      }
      let file = (ev.target as HTMLInputElement).files;
      for(var i = 0; i < file!.length; i++) {
        this.singleFile(file![i], i);
      }
    } else {

    }
  }

  singleFile(file: any, i: number) : void {

    let isAllowedType : boolean = true;
    let allImages : Array<string> = ['image/png', 'image/jpg', 'image/jpeg', 'image/tiff', 'image/bpg'];
    if(allImages.indexOf(file.type) > -1) {
      isAllowedType = false;
    }

    if(file != null && file.size < 10000000 && isAllowedType == false){
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

    this.isSubmit = true;

    let check = false;
    for(var i = 0; i < this.photosToUpload.length; ++i){
      if(this.photosToUpload[i].descricao == ""){
        check = true;
        //MOSTRAR QUE NAO TEM DESCRICAO
        (<HTMLInputElement> window.document.getElementsByClassName("comDescricao")[i]).style.display = "flex";
        
        
      } else {
        (<HTMLInputElement> window.document.getElementsByClassName("loading")[i]).style.display = "flex";
      }
      
      (<HTMLInputElement>window.document.getElementById("nomeFoto" + i)).tabIndex = -1;
      (<HTMLInputElement>window.document.getElementById("descFoto" + i)).tabIndex = -1;
      (<HTMLInputElement>window.document.getElementsByClassName("removePhoto")[i]).tabIndex = -1;

    }
    if(check){
      return; 
    }

    this.submitSingleFoto(this.photosToUpload);

    
     
  }


  confirmNoDescription(nomeFoto : string) {
    console.log(nomeFoto);
    this.photosToUpload[parseInt(nomeFoto)].descricao = " ";
    (<HTMLInputElement> window.document.getElementsByClassName("comDescricao")[parseInt(nomeFoto)]).style.display = "none";
    this.submit();

    

  }

  cancelNoDescription(nomeFoto : string) {
    
    (<HTMLInputElement> window.document.getElementsByClassName("comDescricao")[parseInt(nomeFoto)]).style.display = "none";
    (<HTMLInputElement> window.document.getElementsByClassName("loading")[parseInt(nomeFoto)]).style.display = "none";

    (<HTMLInputElement>window.document.getElementById("nomeFoto" + nomeFoto)).tabIndex = 0;
    (<HTMLInputElement>window.document.getElementById("descFoto" + nomeFoto)).tabIndex = 0;
    (<HTMLInputElement>window.document.getElementsByClassName("removePhoto")[parseInt(nomeFoto)]).tabIndex = 0;

  }

  async submitSingleFoto(photos : PhotoToUpload[]) : Promise<void> {
    if(photos.length == 0) {

      setTimeout( () => { window.location.reload(false); },  1000);
    }

    if(photos && photos.length > 0) {
      let nome = (<HTMLInputElement> window.document.getElementById("nomeFoto"+photos[0].id)).value;
      if (nome != "") {
        photos[0].nome = nome;
      }
      photos[0].descricao = (<HTMLInputElement> window.document.getElementById("descFoto"+photos[0].id)).value;

      // if (photos[0].descricao == "") {
      //   this.confirmNoDescription(photos[0].nome);
      // }

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
             //loading.style.display = "grid";
          }
        }


        //Se erro a buscar id
        if(res == undefined || res.msg == "FAILED") {
          console.log("FAILED ID");
         
            //Mostrar erro
            if(failed !== undefined) {
              failed.style.display = "grid";
            }

            if(loading !== undefined) {
              loading.style.display = "none";
            }          

            this.submitSingleFoto(photos.slice(1, photos.length));
            return;
        }
        

        fd.append('profileImage', photos[0].photo, 'photo_' + res.msg + '.jpg');

        this.photoService.postOnlyPhoto(fd).subscribe(res2 => {
          

          console.log(res.msg);
          if(res.msg == "FAILED" || res2 == undefined) {
            console.log("FAILED PHOTO");

            //Mostrar erro
            if(failed !== undefined) {
              failed.style.display = "grid";
            }

            if(loading !== undefined) {
              loading.style.display = "none";
            }          

            this.submitSingleFoto(photos.slice(1, photos.length));
            return;
          }


          
          let photoInfo = {"id": photos[0].id,
                      "dono": photos[0].dono,
                      "nome": photos[0].nome,
                      "descricao": photos[0].descricao,
                      "photo": res2.msg,
                      "likes": photos[0].likes,
                      "favoritos": photos[0].favoritos} as Photo;

          this.photoService.postPhotoInfo(photoInfo).subscribe( res3 => {
            console.log(res3);

            if(res3 == undefined || res3.msg == "FAILED") {
              console.log("FAILED ID");
             
                //Mostrar erro
                if(failed !== undefined) {
                  failed.style.display = "grid";
                }
    
                if(loading !== undefined) {
                  loading.style.display = "none";
                }          
    
                this.submitSingleFoto(photos.slice(1, photos.length));
                return;
            }

            //Buscar elemento "success" da foto corrente
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
        } else {
			this.photosBase.splice(i,1);
		}
      }
      this.photosToUpload = photosToUploadAux;
      for(let i = 0; i < this.photosToUpload.length; i++) {
        this.photosToUpload[i].id = i.toString();
      }
    }
    this.temErro();
    if(this.isSubmit) {
      this.submit();
    }
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
      this.photosToUpload[parseInt(id)].descricao = (<HTMLInputElement> window.document.getElementById("descFoto"+id)).value;
    }
  }

  temErro() : boolean {

    if(this.isSubmit){
      return false;
    }
    
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