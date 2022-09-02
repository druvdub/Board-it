import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  sendData(board: string, columns: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}api/data/board`,
      { board, columns },
      httpOptions
    );
  }

  fetchData(): Observable<any> {
    return this.http.get(`${this.baseUrl}api/data/board/fetch`, {
      responseType: 'text',
    });
  }
}
