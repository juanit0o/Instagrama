import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Photo } from '../photo';
import { PhotoService } from '../photo.service'

@Component({
  selector: 'app-addphoto',
  templateUrl: './addphoto.component.html',
  styleUrls: ['./addphoto.component.css']
})
export class AddphotoComponent implements OnInit {
  //imageURL!: string;

  photosToUpload?: Photo[];

  uploadForm: FormGroup;
  //photo !:Photo[];
  submitted ?: boolean;
  photos ?: File[];
  filesInput ?: HTMLElement;

  constructor(public fb: FormBuilder, private photoService: PhotoService) { 
    this.uploadForm = this.fb.group({
      avatar: [null],
      name: ['']
    })
  }

  ngOnInit(): void {
    this.photosToUpload = [ ];
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

    const file = (ev.target as HTMLInputElement).files;
    for(var i = 0; i < file!.length; i++) {
      this.singleFile(file![i]);
    }
    
  }

  singleFile(file: any) : void {
    if(file != null && file.size < 10000000000){
        const reader = new FileReader();
        var photo = {"id": this.photosToUpload?.length.toString(),
                    "dono": "DONO",
                    "nome": "NOME",
                    "descricao": "DESC",
                    "photo": "",
                    "likes": [""],
                    "favoritos": [""]} as Photo;
        reader.readAsDataURL(file);
        reader.onloadend = function() {
          photo.photo = reader.result as string;  
        }
        this.photosToUpload?.push(photo);

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

  submitSingleFoto(photos ?: Photo[]) : void{
    if(photos && photos.length > 0) {
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
      for(let i = 0; i < this.photosToUpload!.length; i++) {
        if(this.photosToUpload![i].id != id){
          photosToUploadAux.push(this.photosToUpload![i]);
        }
      }
      this.photosToUpload = photosToUploadAux;
      console.log(this.photosToUpload)
      for(let i = 0; i < this.photosToUpload!.length; i++) {
        this.photosToUpload![i].id = i.toString();
      }
    }
  }

  
}
