import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroFormComponent } from './pages/hero-form/hero-form.component';
import { HeroListComponent } from './pages/hero-list/hero-list.component';
import { DetailResolver } from './resolvers/detail.resolver';
import { ListResolver } from './resolvers/list.resolver';

const routes: Routes = [
  {
    path: '',
    component: HeroListComponent,
    resolve: { resolved: ListResolver },
  },
  {
    path: 'detail/:id',
    component: HeroFormComponent,
    resolve: { resolved: DetailResolver },
  },
  {
    path: 'new',
    component: HeroFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeroesRoutingModule {}
