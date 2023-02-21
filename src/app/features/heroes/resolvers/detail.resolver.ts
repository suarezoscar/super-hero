import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Hero } from 'src/app/core/models/hero.interface';
import { HeroService } from '../services/hero.service';

@Injectable({
  providedIn: 'root',
})
export class DetailResolver implements Resolve<Hero> {
  constructor(private service: HeroService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Hero> {
    return this.service.getById(route.params['id']);
  }
}
