import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesListaComponent } from './games-lista/games-lista.component'
import { GamesFormComponent } from './../games-form/games-form.component';

const routes: Routes = [
  { path: '', component: GamesListaComponent },
  { path: 'novo', component: GamesFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
