import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../../common/login-response';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/users';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(username: String): Observable<LoginResponse> {
    let url = `${baseUrl}/loginRequest?username=${username}`;
    return this.http.get<LoginResponse>(url);
  }
}
