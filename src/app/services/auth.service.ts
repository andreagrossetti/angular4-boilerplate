import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiBaseUrl } from 'app';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject(null);
  private userSubject = new BehaviorSubject(null);
  public jwtToken: string;
  constructor(private http: HttpClient, private router: Router) {}

  getOptions() {
    let headers = new HttpHeaders();
    if (this.jwtToken) {
      headers = headers.append('Authorization', `Bearer: ${this.jwtToken}`);
    }
    return { headers };
  }

  // private user: User;

  // private setUser(user) {
  //   localStorage.setItem('user', JSON.stringify(user));
  //   this.user = user;
  // }

  login(data) {
    return this.http.post(`${ApiBaseUrl}/login`, data).pipe(map(user => {
      // this.setUser(user.json());
      // return user.json()
    }));
  }

  logout() {
    localStorage.removeItem('user');
  }

  // getUser() {
  //   if (!this.user) {
  //     if (localStorage.getItem('user')) {
  //       // for some reason user has been removed from localStorage, try to recover it
  //       this.setUser(JSON.parse(localStorage.getItem('user')));
  //       return this.user;
  //     } else {
  //       this.router.navigate(['/login']);
  //     }
  //   } else {
  //     return this.user;
  //   }
  // }

  // getAccessToken() {
  //   if (this.user) {
  //     return !!this.user.access_token;
  //   }
  // }
}
