
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReleasesListaComponent } from './releases-lista/releases-lista.component';
import { ReleasesRoutingModule } from './releases-routing.module';


@NgModule({
  declarations: [ReleasesListaComponent],
  imports: [
    CommonModule,
    ReleasesRoutingModule
  ]
})
export class ReleasesModule { }
