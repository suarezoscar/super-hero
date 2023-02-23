import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap, distinctUntilChanged } from 'rxjs';
import { Hero } from 'src/app/core/models/hero.interface';
import { API } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(private http: HttpClient) {}

  private readonly url = API.BASE_URL + '/heroes';

  get(
    _page = 0,
    _limit = 10,
    superhero_like: string = ''
  ): Observable<HttpResponse<Hero[]>> {
    const params = { _page: _page + 1, _limit, superhero_like };

    return this.http
      .get<Hero[]>(this.url, {
        params,
        responseType: 'json',
        observe: 'response',
      })
      .pipe(
        distinctUntilChanged(),
        catchError((err: HttpErrorResponse) =>
          this.handleError<HttpResponse<Hero[]>>(
            'getHeroes',
            err,
            new HttpResponse<Hero[]>()
          )
        )
      );
  }

  getById(id: number): Observable<Hero> {
    return this.http
      .get<Hero>(`${this.url}/${id}`)
      .pipe(
        catchError((error) =>
          this.handleError<Hero>('getHeroById', error, {} as Hero)
        )
      );
  }

  delete(id: number): Observable<Hero> {
    return this.http
      .delete<Hero>(`${this.url}/${id}`)
      .pipe(
        catchError((error) =>
          this.handleError<Hero>('getHeroById', error, {} as Hero)
        )
      );
  }

  post(hero: Partial<Hero>): Observable<Partial<Hero>> {
    return this.http
      .post(this.url, hero)
      .pipe(
        catchError((error) =>
          this.handleError<Hero>('postHero', error, {} as Hero)
        )
      );
  }

  put(id: number, hero: Partial<Hero>): Observable<Partial<Hero>> {
    return this.http
      .put(`${this.url}/${id}`, hero)
      .pipe(
        catchError((error) =>
          this.handleError<Hero>('putHero', error, {} as Hero)
        )
      );
  }

  private handleError<T>(
    method: string,
    err: HttpErrorResponse,
    response: T
  ): Observable<T> {
    console.error(method, err.message);
    return of(response);
  }
}
