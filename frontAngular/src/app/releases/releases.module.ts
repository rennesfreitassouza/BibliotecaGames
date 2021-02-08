
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReleasesListaComponent } from './releases-lista/releases-lista.component';
import { ReleasesRoutingModule } from './releases-routing.module';
import { ReleasesFormComponent } from './releases-form/releases-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ReleasesListaComponent, ReleasesFormComponent],
  imports: [
    CommonModule,
    ReleasesRoutingModule,
    ReactiveFormsModule
  ]
})
export class ReleasesModule { }
