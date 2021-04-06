import { Injectable } from '@angular/core';
import { User } from './user';
import { Msg } from './msg';
import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  private usersUrl = 'http://localhost:3001/users';
  private loginUrl = 'http://localhost:3001/login';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  
  constructor(
    private http: HttpClient
  ) { }

  addUser(nickname: string, password: string) : Observable<Msg> {
    console.log("@aut.service.addUser  " + nickname + " " + password);
    var jsonToConvert = '{"nickname":' + JSON.stringify(nickname) + ',"password":' + JSON.stringify(password) + '}';
    var converted = JSON.parse(jsonToConvert);
    console.log(converted);
    return this.http.post<Msg>(this.usersUrl, converted, this.httpOptions);
  }

  update(user: User) {
    return this.http.put(this.usersUrl,user);
  }

 
  login(nickname: string, password: string) : Observable<Msg> {
    console.log("@aut.service.login  " + nickname + " " + password);
    var jsonToConvert = '{"nickname":' + JSON.stringify(nickname) + ',"password":' + JSON.stringify(password) + '}';
    var converted = JSON.parse(jsonToConvert);
    console.log(converted);
    return this.http.post<Msg>(this.loginUrl, converted, this.httpOptions);
  }


}
  
  
