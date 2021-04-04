import { Component, OnInit } from '@angular/core';

import { Photo } from '../photo';
import { PhotoService } from '../photo.service'

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  photos : Photo[];
  ordena : string;

  constructor(
    private photoService: PhotoService,
  ) { 

    this.photos = [];
    this.ordena = "Mais Recentes V"

  }

  ngOnInit(): void {

    this.getPhotos();

    
  }

  getPhotos(): void {
    this.photoService.getPhotos().subscribe(response => 
      {
        this.photos = response.map( item => 
        {
          return item;
        });
      });

  }

  ordenaMuda(text: string) {
    this.ordena = text + " V";
  }

  openPhoto(id: string) {
    console.log(id);
    //let a = (document.getElementById(id) as HTMLInputElement);
    //a.href = "/foto/" + id;
  }

}
 