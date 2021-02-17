import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { GamesListaComponent } from './games-lista/games-lista.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GamesFormComponent } from './games-form/games-form.component';


@NgModule({
  declarations: [GamesListaComponent, GamesFormComponent],
  imports: [
    CommonModule,
    GamesRoutingModule,
    ReactiveFormsModule
  ]
})
export class GamesModule { }
