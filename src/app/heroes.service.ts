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

  create(hero: Hero, endpoint: string): Observable<Hero> {
    return this.http.post<Hero>(endpoint.trim(), { hero }, this.httpOptions);
  }

  delete(id: number, endpoint: string): Observable<any> {
    const url = `${endpoint.trim()}/${id}`;

    return this.http.delete<any>(url, this.httpOptions);
  }

  update(hero: Hero, endpoint: string): Observable<Hero> {
    const url = `${endpoint.trim()}/${hero.id}`;

    return this.http.put<Hero>(url, { hero }, this.httpOptions);
  }

  private getToken(): string {
    return (
      localStorage.getItem('token') || Math.random().toString(36).substr(-10)
    );
  }
}
