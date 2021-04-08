import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { PhotoToUpload } from '../photoToUpload';
import { PhotoService } from '../photo.service'
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-addphoto',
  templateUrl: './addphoto.component.html',
  styleUrls: ['./addphoto.component.css']
})
export class AddphotoComponent implements OnInit {
  //imageURL!: string;

  photosToUpload : PhotoToUpload[];

  uploadForm: FormGroup;
  //photo !:Photo[];
  submitted ?: boolean;
  photos ?: File[];
  filesInput ?: HTMLElement;

  constructor(public fb: FormBuilder, private photoService: PhotoService, private auth : AuthenticationService) { 
    this.uploadForm = this.fb.group({
      avatar: [null],
      name: ['']
    })
    this.photosToUpload = [ ];
  }

  ngOnInit(): void {
    //(<HTMLInputElement> window.document.getElementById("photoUploadButton")).disabled = true;
    
    //this.imageURL = [];
    /** 
    this.filesInput = document.getElementById("files") as HTMLElement;
        
    this.filesInput.addEventListener("change", function(event){
        
        var files = (<HTMLInputElement>event.target).files; //FileList object
        //var photos : Photo[] = (<HTMLInputElement>event.target).files;
        var output = document.getElementById("result");
        
        for(var i = 0; i< files!.length; i++){
            //this.photos.push( files![i]); //pq da erro, append para um array de files
            var file = files![i];
            
            //Only pics
            if(!file.type.match('image'))
              continue;
            
            var picReader = new FileReader();
            
            picReader.addEventListener("load",function(event){
                
                var picFile = event.target;
                
                var div = document.createElement("div");
                div.className = "fotoInd";
                
                div.innerHTML = "<img class='thumbnail' src='" + picFile!.result + "'" +
                        "title='" + picFile+ "'/>";
                
                output!.insertBefore(div,null);            
            
            });
            
             //Read the image
            picReader.readAsDataURL(file);
            this.photos.push(file);
        }                               
       
    });*/
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
        let fd = new FormData();
        fd.append('profileImage', <File>file, "TEST");
        let photo = {"id": this.photosToUpload.length.toString(),
                    "dono": this.auth.getUserDetails()?.nickname.toString(),
                    "nome": file.name.split(".")[0],           //NOME DO FILE
                    "descricao": "",
                    "photo": fd,
                    "likes": [""],
                    "favoritos": [""]} as PhotoToUpload;
        reader.readAsDataURL(file);
        reader.onloadend = function() {
          photo.photo = reader.result as string;  
        }
        this.photosToUpload.push(photo);
      } else {
        //TODO --------------------------------- MOSTRA NO UTILIZADOR
        alert("Cant upload this file!");
      }
  }

  submit(): void{
    console.log(this.photosToUpload);
    /*
    for(var i = 0; i < this.photosToUpload!.length; i++){
      console.log(this.photosToUpload![i]);
      this.photoService.postPhoto(this.photosToUpload![i]).subscribe( res =>{ //mandar os bytes ja
            //payload too large
            //TODO TRATAR O ERRO
            console.log(res.msg);

          }
        )
    }*/
    
    this.submitSingleFoto(this.photosToUpload);
    
  }

  submitSingleFoto(photos ?: PhotoToUpload[]) : void{
    if(photos && photos.length > 0) {
      let nome = (<HTMLInputElement> window.document.getElementById("nomeFoto"+photos[0].id)).value;
      if (nome != "") {
        photos[0].nome = nome;
      }
      photos[0].descricao = (<HTMLInputElement> window.document.getElementById("descFoto"+photos[0].id)).value;

      console.log(photos[0]);

      this.photoService.postPhoto(photos[0]).subscribe( res =>{ //mandar os bytes ja
        console.log(res);

        

        if(res.msg == "SUCESSO POSTPHOTO") {
          this.submitSingleFoto(photos.slice(1, photos.length));
        } else {
          //TOMAR CONTA DO ERRO
        }
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

  
}
