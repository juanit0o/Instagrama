import { Component, OnInit } from '@angular/core';
import { DataserviceService} from '../dataservice.service';

@Component({
  selector: 'app-testeupload',
  templateUrl: './testeupload.component.html',
  styleUrls: ['./testeupload.component.css']
})
export class TesteuploadComponent implements OnInit {

  choosen : boolean;
  image : any;
  submitted : boolean;
  constructor(private dataService: DataserviceService) { 
    this.choosen = false;
    this.submitted = false;
    this.image = null;

  }
  

  ngOnInit(): void {
  }

  fileChoosen(event: any): void {
    if(event.target.value){
      this.image = <File> event.target.files[0].value;
      this.choosen = true;
    }
  }

  submitPhoto(){
    let fd = new FormData();
    this.submitted = true;
    if(this.image){
      fd.append('profileImage', this.image, this.image.name);
      //this.dataService.updateProfileImage(fd).subscribe((res)=>{
      //  if(res['success']){
      //    this.submitted = false;
      //   // this.getProfile();
      //  }
      //});
    }
  }

}
