import { Component, OnInit } from '@angular/core';
import { Photo } from '../photo';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  public photos : Photo[];

  constructor() { 

    this.photos = [];

  }

  ngOnInit(): void {

    //LOAD DAS FOTOS

  }

}
 