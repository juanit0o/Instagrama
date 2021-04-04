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
  private photoUrl = 'http://localhost:3001/photo';
  private photosIdsUrl = 'http://localhost:3001/photosid';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor (
    private http: HttpClient
  ) { }

  //DEVOLVE TODAS AS FOTOS (COM TODA A INFO)
  getPhotos() : Observable<Photo[]> {
    return this.http.get<Photo[]>(this.photosUrl);
  }

  getPhotosIds() : Observable<Photo[]> {
    return this.http.get<Photo[]>(this.photosIdsUrl);
  }

  getPhotoById(id: string) : Observable<Photo> {
    return this.http.get<Photo>(this.photoUrl + "/" + id);
  }


}
