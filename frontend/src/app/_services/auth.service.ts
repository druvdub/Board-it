import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}api/auth/login`,
      { email, password },
      this.httpOptions
    );
  }

  signup(email: string, password: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}api/auth/signup`,
      { email, password },
      this.httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(
      `${this.baseUrl}api/auth/logout`,
      {},
      this.httpOptions
    );
  }
}
