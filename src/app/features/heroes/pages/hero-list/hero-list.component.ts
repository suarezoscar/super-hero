import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subscription, tap } from 'rxjs';
import { Hero } from 'src/app/core/models/hero.interface';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
})
export class HeroListComponent implements OnInit, AfterViewChecked {
  displayedColumns: string[] = [
    'superhero',
    'publisher',
    'alter_ego',
    'edit',
    'delete',
  ];

  heroes!: Observable<Hero[]>;
  pageSize: number = 10;
  pageIndex: number = 0;
  totalCount: number = 0;
  searchValue: string = '';

  constructor(
    private heroService: HeroService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    public loadingService: LoadingService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngAfterViewChecked(): void {
    this.changeDetector.detectChanges();
  }

  ngOnInit(): void {
    const { heroes, totalCount } = this.route.snapshot.data['resolved'];
    this.heroes = heroes;
    this.totalCount = totalCount;
  }

  handlePageEvent({ pageIndex, pageSize }: PageEvent) {
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.fetchHeroes();
  }

  handleDelete(data: Hero): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        title: 'Delete Hero',
        content: `Would you like to delete ${data.superhero} ?`,
      },
    });

    dialogRef.afterClosed().subscribe((doDelete) => {
      if (doDelete) {
        this.heroService
          .delete(data.id)
          .pipe(tap(() => this.fetchHeroes()))
          .subscribe(() =>
            this.snackBar.open(
              `${data.superhero} Successfully deleted 😄`,
              'Close',
              { duration: 3000 }
            )
          );
      }
    });
  }

  fetchHeroes(): void {
    this.heroes = this.heroService
      .get(this.pageIndex, this.pageSize, this.searchValue)
      .pipe(
        map((x) => {
          this.totalCount = Number(x.headers.get('x-total-count'));
          return x.body || [];
        })
      );
  }
}
