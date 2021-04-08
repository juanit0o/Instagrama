import { Injectable } from '@angular/core';
import { User } from './user';
import { Msg } from './msg';
import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

export var nickname: string;

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  
  constructor(
    private http: HttpClient
  ) {
    nickname = "TESTEASDASD";
   }


  
  addUser(nickname: string, password: string) : Observable<Msg> {
    console.log("@aut.service.addUser  " + nickname + " " + password);
    var jsonToConvert = '{"nickname":' + JSON.stringify(nickname) + ',"password":' + JSON.stringify(password) + '}';
    var converted = JSON.parse(jsonToConvert);
    console.log(converted);
    return this.http.post<Msg>('http://localhost:3001/users', converted, this.httpOptions);
  }

  update(nickname: string, password: string) : Observable<Msg>{
    console.log("@aut.service.update  " + nickname + " " + password);
    var jsonToConvert = '{"nickname":' + JSON.stringify(nickname) + ',"password":' + JSON.stringify(password) + '}';
    var converted = JSON.parse(jsonToConvert);
    console.log(converted);
    return this.http.put<Msg>('http://localhost:3001/users',converted, this.httpOptions);
  }

 
  login(nick: string, password: string) : Observable<Msg> {
    console.log("@aut.service.login  " + nick + " " + password);
    var jsonToConvert = '{"nickname":' + JSON.stringify(nick) + ',"password":' + JSON.stringify(password) + '}';
    var converted = JSON.parse(jsonToConvert);
    console.log(converted);
    nickname = nick;
    return this.http.post<Msg>('http://localhost:3001/login', converted, this.httpOptions);
  }

  logout(nickname: string) : Observable<Msg> {
    console.log("@aut.service.logout  " + nickname);
    var jsonToConvert = '{"nickname":' + JSON.stringify(nickname) + '}';
    var converted = JSON.parse(jsonToConvert);
    console.log(converted);
    return this.http.post<Msg>('http://localhost:3001/logout', converted, this.httpOptions);
  }

  getNick() : string {
    return nickname;
  }

}
  
  
