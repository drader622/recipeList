import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../common/user';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

const baseUrl = 'http://localhost:8080/api/users';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router) {}

  login(username: String, password: String): Observable<Boolean> {
    let url = `${baseUrl}/loginRequest?username=${username}&password=${password}`;
    return this.http.get<Boolean>(url);
  }

  logout() {
    let url = `${baseUrl}/logout`;
    return this.http.post<Boolean>(url, '');
  }

  register(request: User): Observable<User> {
    let url = `${baseUrl}/register`;
    return this.http.post<User>(url, request);
  }

  checkForUser(username: String) {
    let url = `${baseUrl}/checkForUser?username=${username}`;
    return this.http.get<Boolean>(url);
  }

  getUserInfo() {
    let url = `${baseUrl}/userInfo`;
    return this.http.get<User>(url);
  }

  getAuthState() {
    let url = `${baseUrl}/authState`;
    return this.http.get<Boolean>(url);
  }
}
