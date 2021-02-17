import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReleasesListaComponent } from './releases-lista/releases-lista.component';
import { ReleasesFormComponent } from './releases-form/releases-form.component';

const routes: Routes = [
  { path: '', component: ReleasesListaComponent },
  { path: 'novo', component: ReleasesFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReleasesRoutingModule { }