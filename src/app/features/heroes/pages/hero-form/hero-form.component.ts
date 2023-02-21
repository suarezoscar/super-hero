import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroFormGroup } from 'src/app/core/models/hero.interface';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css'],
})
export class HeroFormComponent implements OnInit, AfterViewChecked {
  formGroup!: FormGroup<HeroFormGroup>;

  constructor(
    private heroService: HeroService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    public loadingService: LoadingService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngAfterViewChecked(): void {
    this.changeDetector.detectChanges();
  }

  id!: number;

  ngOnInit(): void {
    const { superhero, publisher, alter_ego, id } =
      this.route.snapshot?.data['resolved'] || {};

    this.id = id;

    this.formGroup = new FormGroup({
      superhero: new FormControl(superhero, Validators.required),
      publisher: new FormControl(publisher, Validators.required),
      alter_ego: new FormControl(alter_ego, Validators.required),
    });
  }

  submit(): void {
    const { alter_ego, publisher, superhero } = this.formGroup.value;

    if (alter_ego && publisher && superhero) {
      const payload = { alter_ego, publisher, superhero };

      const obs = this.id
        ? this.heroService.put(this.id, payload)
        : this.heroService.post(payload);

      obs.subscribe((_) => {
        this.router.navigate(['heroes']).then(() => {
          this.snackBar.open(
            `${superhero} Successfully ${this.id ? 'modified' : 'created'} 😄`,
            'Close',
            {
              duration: 3000,
            }
          );
        });
      });
    }
  }
}
