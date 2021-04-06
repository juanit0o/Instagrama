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
        var photo = {"id": "",
                    "dono": "",
                    "nome": "string",
                    "descricao": "string",
                    "photoPath": "",
                    "likes": [""],
                    "favoritos": [""]} as Photo;
        reader.readAsDataURL(file);
        reader.onloadend = function() {
          photo.photoPath = reader.result as string;  
        }
        this.photosToUpload?.push(photo);

      } else {
        //TODO --------------------------------- MOSTRA NO UTILIZADOR
        alert("Cant upload this file!");
      }
  }

  submit(): void{
    for(var i = 0; i < this.photosToUpload!.length; i++){
      console.log(this.photosToUpload![i]);
      this.photoService.postPhoto(this.photosToUpload![i]).subscribe( res =>{ //mandar os bytes ja
            //payload too large
            //TODO TRATAR O ERRO
            console.log(res.msg);

          }
        )
    }
    /*
    
      let formdata = new FormData();
      this.submitted = true;
      if(this.photos![i]){
        formdata.append("photo", this.photos![i], this.photosToUpload![i].name);
        
      }
    }*/
    
  }


  
}
