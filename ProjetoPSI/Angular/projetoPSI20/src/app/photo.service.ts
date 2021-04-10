import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Photo } from './photo';
import { PhotoToUpload } from './photoToUpload';
import { Msg } from './msg';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor (
    private http: HttpClient
  ) { }

  //DEVOLVE TODAS AS FOTOS (COM TODA A INFO)
  getPhotos() : Observable<Photo[]> {
    return this.http.get<Photo[]>('http://localhost:3001/photos');
  }

  //50 FOTOS MAIS RECENTES
  getPhotosIdsRecentes() : Observable<Photo[]> {
    return this.http.get<Photo[]>('http://localhost:3001/photosidRecentes');
  }

  getPhotosIdsAntigas() : Observable<Photo[]> {
    return this.http.get<Photo[]>('http://localhost:3001/photosidAntigas');
  }

  getPhotosIdsLikes() : Observable<Photo[]> {
    return this.http.get<Photo[]>('http://localhost:3001/photosidLikes');
  }

  getPhotoById(id: string) : Observable<Photo> {
    return this.http.get<Photo>('http://localhost:3001/photo/' + id);
  }

  postPhotoInfo(content: Photo) : Observable<Msg>{
    return this.http.post<Msg>('http://localhost:3001/photoinfo', content, this.httpOptions);
  }

  postOnlyPhoto(content: any) : Observable<Msg>{
    return this.http.post<Msg>('http://localhost:3001/photopath', content);
  }

  getLastId() : Observable<Msg>{
    return this.http.get<Msg>('http://localhost:3001/photolastid');
  }

  getDonosFotos(nickname: string) : Observable<Photo[]> {
    return this.http.get<Photo[]>('http://localhost:3001/donosFotos/' + nickname);
  }
  
  deletePhoto(info: string) : Observable<Msg> {
    return this.http.delete<Msg>('http://localhost:3001/apagaFoto/' + info);
  }

}
