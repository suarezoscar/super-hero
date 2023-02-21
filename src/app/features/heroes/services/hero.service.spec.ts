import { HttpResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Hero } from 'src/app/core/models/hero.interface';

import { HeroService } from './hero.service';

describe('HeroService', () => {
  let service: HeroService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroService],
    });
    service = TestBed.inject(HeroService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should return an Observable<HttpResponse<Hero[]>>', () => {
    const mockHeroes = [
      {
        id: 1,
        superhero: 'Batman',
        publisher: 'DC Comics',
        alter_ego: 'Bruce Wayne',
      },
      {
        alter_ego: 'Clark Kent',
        publisher: 'DC Comics',
        superhero: 'Superman',
        id: 2,
      },
    ];

    service.get().subscribe((heroes) => {
      expect(heroes.body?.length).toBe(2);
      expect(heroes.body).toEqual(mockHeroes);
    });

    const req = httpTestingController.expectOne(
      'http://localhost:3000/heroes?_page=1&_limit=10&superhero_like='
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockHeroes);
  });
});
