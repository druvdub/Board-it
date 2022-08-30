import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}api/auth/login`,
      {
        email,
        password,
      },
      httpOptions
    );
  }

  signup(email: string, password: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}api/auth/signup`,
      {
        email,
        password,
      },
      httpOptions
    );
  }

  refreshToken(token: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}api/auth/refreshToken`,
      {
        refreshToken: token,
      },
      httpOptions
    );
  }
}
