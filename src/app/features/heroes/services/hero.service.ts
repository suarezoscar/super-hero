import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, distinctUntilChanged } from 'rxjs';
import HttpStatusCode from 'src/app/core/constants/httpStatusCode';
import { Hero } from 'src/app/core/models/hero.interface';
import { API } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

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
            `Oops! Something went wrong ☹️. Try Again later.`,
            err
          )
        )
      );
  }

  getById(id: number): Observable<Hero> {
    return this.http
      .get<Hero>(`${this.url}/${id}`)
      .pipe(
        catchError((error) =>
          this.handleError<Hero>(
            'getHeroById',
            `Oops! Something went wrong ☹️. Try Again later.`,
            error
          )
        )
      );
  }

  delete(id: number): Observable<Hero> {
    return this.http
      .delete<Hero>(`${this.url}/${id}`)
      .pipe(
        catchError((error) =>
          this.handleError<Hero>(
            'getHeroById',
            `Oops! hero can't be deleted ☹️. Try Again later.`,
            error
          )
        )
      );
  }

  post(hero: Partial<Hero>): Observable<Partial<Hero>> {
    return this.http
      .post(this.url, hero)
      .pipe(
        catchError((error) =>
          this.handleError<Hero>(
            'postHero',
            `Oops! ${hero.superhero} can't be created ☹️. Try Again later.`,
            error
          )
        )
      );
  }

  put(id: number, hero: Partial<Hero>): Observable<Partial<Hero>> {
    return this.http
      .put(`${this.url}/${id}`, hero)
      .pipe(
        catchError((error) =>
          this.handleError<Hero>(
            'putHero',
            `Oops! ${hero.superhero} can't be edited ☹️. Try Again later.`,
            error
          )
        )
      );
  }

  private handleError<T>(
    method: string,
    message: string,
    err: HttpErrorResponse
  ): Observable<T> {
    console.error('LOG_ERROR ->', method, err);
    switch (err.status) {
      case HttpStatusCode.INTERNAL_SERVER_ERROR: // do someting
      default:
        this.snackBar.open(message, 'Close', { duration: 7000 });
    }

    return new Observable<T>();
  }
}
