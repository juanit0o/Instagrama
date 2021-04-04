import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Photo } from './photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private photosUrl = 'http://localhost:3001/photos';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor (
    private http: HttpClient
  ) { }

  getPhotos() : Observable<Photo[]> {
    return this.http.get<Photo[]>(this.photosUrl);
  }


}
