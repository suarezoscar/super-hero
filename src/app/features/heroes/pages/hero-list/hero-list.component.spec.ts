import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroListComponent } from './hero-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { of } from 'rxjs';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Hero } from 'src/app/core/models/hero.interface';
import { HeroService } from '../../services/hero.service';
import { HttpResponse } from '@angular/common/http';

describe('HeroListComponent', () => {
  let component: HeroListComponent;
  let fixture: ComponentFixture<HeroListComponent>;
  let heroServiceSpy: jasmine.SpyObj<HeroService>;

  beforeEach(async () => {
    heroServiceSpy = jasmine.createSpyObj('HeroService', {
      get: of(new HttpResponse<Hero>({})),
      delete: of({} as Hero),
    });

    await TestBed.configureTestingModule({
      declarations: [HeroListComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        SharedModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: HeroService, useValue: heroServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                resolved: {
                  heroes: [
                    {
                      id: 1,
                      superhero: 'Superman',
                      publisher: 'DC Comics',
                      alter_ego: 'Clark Kent',
                    },
                  ],
                  totalCount: 0,
                },
              },
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open dialog on handleDelete and delete hero on confirmation', () => {
    const hero: Hero = {
      id: 1,
      superhero: 'Superman',
      publisher: 'DC Comics',
      alter_ego: 'Clark Kent',
    };

    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpy.afterClosed.and.returnValue(of(true));

    const dialogSpy = spyOn(component.dialog, 'open').and.returnValue(
      dialogRefSpy
    );

    const fetchHeroesSpy = spyOn(component, 'fetchHeroes');

    let button = fixture.debugElement.nativeElement.querySelector(
      'button[id="delete-1"]'
    );
    button.click();

    heroServiceSpy.delete.and.returnValue(of({} as Hero));

    component.handleDelete(hero);

    expect(dialogSpy).toHaveBeenCalled();

    dialogRefSpy.afterClosed().subscribe((doDelete: boolean) => {
      expect(doDelete).toBeTrue();
      expect(heroServiceSpy.delete).toHaveBeenCalledWith(hero.id);
      expect(fetchHeroesSpy).toHaveBeenCalled();
    });
  });
});
