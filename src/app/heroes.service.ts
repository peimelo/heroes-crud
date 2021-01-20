import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from './hero.model';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.getToken(),
    }),
  };

  constructor(private http: HttpClient) {}

  getAll(endpoint: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(endpoint.trim(), this.httpOptions);
  }

  delete(id: number, endpoint: string): Observable<any> {
    const url = `${endpoint.trim()}/${id}`;

    return this.http.delete<any>(url, this.httpOptions);
  }

  private getToken(): string {
    return (
      localStorage.getItem('token') || Math.random().toString(36).substr(-10)
    );
  }
}
