import { FormControl } from '@angular/forms';

export interface Hero {
  id: number;
  superhero: string;
  publisher: string;
  alter_ego: string;
}

export interface PaginatedHeroes {
  totalCount: number;
  heroes: Hero[];
}

export interface HeroFormGroup {
  superhero: FormControl<string | null>;
  publisher: FormControl<string | null>;
  alter_ego: FormControl<string | null>;
}
