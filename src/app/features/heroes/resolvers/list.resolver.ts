import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { Hero } from 'src/app/core/models/hero.interface';
import { HeroService } from '../services/hero.service';

@Injectable({
  providedIn: 'root',
})
export class ListResolver
  implements Resolve<Observable<{ heroes: Hero[]; totalCount: number }>>
{
  constructor(private service: HeroService) {}

  resolve(): Observable<{ heroes: Hero[]; totalCount: number }> {
    return this.service.get().pipe(
      map((x) => {
        const totalCount = Number(x.headers.get('x-total-count'));
        return { heroes: x.body ?? ([] as Hero[]), totalCount };
      })
    );
  }
}
