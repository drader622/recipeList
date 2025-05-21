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
  constructor(private http: HttpClient) {}

  login(username: String, password: String): Observable<Number> {
    let url = `${baseUrl}/loginRequest?username=${username}&password=${password}`;
    return this.http.get<Number>(url);
  }

  register(request: User): Observable<User> {
    let url = `${baseUrl}/register`;
    console.log(request)
    return this.http.post<User>(url, request);
  }
}
