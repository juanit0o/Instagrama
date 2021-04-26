import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';
import { Msg } from './msg';

export interface UserDetails {
  _id: string;
  nickname: string;
  exp: number;
  iat: number;
}

interface TokenResponse {
  token?: string;
}

export interface TokenPayload {
  password: string;
  nickname?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private token?: string;

  private backendURL = "http://localhost:3001";

  constructor(private http: HttpClient, private router: Router) {}

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token')!;
    }
    return this.token;
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null as any;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private request(method: 'post'|'get'|'put', type: 'login'|'register'|'profile'|'update', user?: TokenPayload): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.http.post(this.backendURL + `/api/${type}`, user);
    } else if(method === 'get') {
      base = this.http.get(this.backendURL + `/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    } else {
      base = this.http.put(this.backendURL + `/api/${type}`, user);
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  public register(user: TokenPayload): Observable<any> {
    return this.request('post', 'register', user);
  }

  public login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
  }

  public profile(): Observable<any> {
    return this.request('get', 'profile');
  }

  public update(user: TokenPayload): Observable<any> {
    console.log(user);
    return this.request('put', 'update', user);
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/');
  }

  userExists(nickname: string) : Observable<Msg> {
    const getUserURL = `http://localhost:3001/getUser/`;
    const url = `${getUserURL}${nickname}`;
    console.log(url)
    return this.http.get<Msg>(url);
  }

/*
  public hasPhotos(): Observable<any> {

  }
  */
}
