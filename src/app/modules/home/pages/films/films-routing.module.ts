import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmsFormComponent } from '../films-form/films-form.component';
import { FilmsComponent } from './films.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: FilmsComponent },
  { path: 'form/:id/:option', component: FilmsFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilmsRoutingModule { }
