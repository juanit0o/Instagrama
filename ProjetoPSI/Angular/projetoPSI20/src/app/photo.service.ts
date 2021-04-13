import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap, timeout } from 'rxjs/operators';

import { Photo } from './photo';
import { PhotoToUpload } from './photoToUpload';
import { Msg } from './msg';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  timeoutTime : number;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor (
    private http: HttpClient
  ) { 
    
    //Tempo para dar timeout de qualquer pedido
    this.timeoutTime = 30000;
  }

  //DEVOLVE TODAS AS FOTOS (COM TODA A INFO)
  getPhotos() : Observable<Photo[]> {
    return this.http.get<Photo[]>('http://localhost:3001/photos');
  }

  //50 FOTOS MAIS RECENTES
  getPhotosIdsRecentes() : Observable<Photo[]> {
    return this.http.get<Photo[]>('http://localhost:3001/photosidRecentes');
  }

  getPhotosByUserId(id: string) : Observable<Photo[]> {
    return this.http.get<Photo[]>('http://localhost:3001/photosUser/'+id);
  }

  getPhotosIdsAntigas() : Observable<Photo[]> {
    return this.http.get<Photo[]>('http://localhost:3001/photosidAntigas');
  }

  getPhotosIdsLikes() : Observable<Photo[]> {
    return this.http.get<Photo[]>('http://localhost:3001/photosidLikes');
  }

  getPhotoById(id: string) : Observable<Photo | undefined>  {
    return this.http.get<Photo>('http://localhost:3001/photo/' + id).pipe(
      timeout(this.timeoutTime),
      catchError(e => {
        console.log("TIME OUT getPhotoById")
        return of(undefined);
      })
    );
  }

  postPhotoInfo(content: Photo) : Observable<Msg | undefined>{
    return this.http.post<Msg>('http://localhost:3001/photoinfo', content, this.httpOptions).pipe(
      timeout(this.timeoutTime),
      catchError(e => {
        console.log("TIME OUT postPhotoInfo")
        return of(undefined);
      })
    );;
  }

  postOnlyPhoto(content: any) : Observable<Msg | undefined>{
    return this.http.post<Msg>('http://localhost:3001/photopath', content).pipe(
      timeout(this.timeoutTime),
      catchError(e => {
        console.log("TIME OUT postOnlyPhoto")
        return of(undefined);
      })
    );;
  }

  getLastId() : Observable<Msg | undefined> {
    return this.http.get<Msg>('http://localhost:3001/photolastid').pipe(
      timeout(this.timeoutTime),
      catchError(e => {
        console.log("TIME OUT getLastId")
        return of(undefined);
      })
    );
  }

  getDonosFotos(nickname: string) : Observable<Photo[]> {
    return this.http.get<Photo[]>('http://localhost:3001/donosFotos/' + nickname);
  }

  
  
  deletePhoto(info: string) : Observable<Msg> {
    return this.http.delete<Msg>('http://localhost:3001/apagaFoto/' + info);
  }

  addLikeToPhoto(id: string, nickname: string) : Observable<Photo> {
    let content = { "id": id, "nickname": nickname };
    return this.http.post<Photo>('http://localhost:3001/likeFoto', content, this.httpOptions);
  }

  removeLikeToPhoto(id: string, nickname: string) : Observable<Photo> {
    let content = { "id": id, "nickname": nickname };
    return this.http.post<Photo>('http://localhost:3001/removeLikeFoto', content, this.httpOptions);
  }

}
