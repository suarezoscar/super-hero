import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroFormComponent } from './pages/hero-form/hero-form.component';
import { HeroListComponent } from './pages/hero-list/hero-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HeroFormComponent, HeroListComponent],
  imports: [CommonModule, HeroesRoutingModule, SharedModule, FormsModule, ReactiveFormsModule],
})
export class HeroesModule {}
