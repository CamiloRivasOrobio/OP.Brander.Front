import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FilmsRoutingModule } from './films-routing.module';
import { FilmsComponent } from '../films/films.component';
import { MatTabsModule } from '@angular/material/tabs';
import { LoadingModule } from 'src/app/shared/components/loading/loading.module';
import { GenericTableModule } from 'src/app/shared/components/generic-table/generic-table.module';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FilmsFormComponent } from '../films-form/films-form.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    FilmsComponent,
    FilmsFormComponent
  ],
  imports: [
    CommonModule,
    FilmsRoutingModule,
    LoadingModule,
    MatTabsModule,
    GenericTableModule,
    HttpClientModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatPaginatorModule
  ],
  providers: [
    DatePipe
  ]
})
export class FilmsModule { }
