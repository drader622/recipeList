import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../../common/login-response';
import { Observable } from 'rxjs';
import { User } from '../../common/user';

const baseUrl = 'http://localhost:8080/api/users';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  currentUser: User = new User();
  constructor(private http: HttpClient) {}

  login(username: String, password: String): Observable<number> {
    let url = `${baseUrl}/loginRequest?username=${username}&password=${password}`;
    return this.http.get<number>(url);
  }

  register(request: User): Observable<User> {
    let url = `${baseUrl}/register`;
    console.log(request)
    return this.http.post<User>(url, request);
  }

  getUser() {
    let url = `${baseUrl}/userInfo`;
    return this.http.get<User>(url);
  }

  getAuthState() {
    let url = `${baseUrl}/authState`;
    return this.http.get<Boolean>(url);
  }
}
