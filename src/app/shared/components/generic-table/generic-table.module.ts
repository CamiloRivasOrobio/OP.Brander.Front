import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from './generic-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoadingModule } from '../loading/loading.module';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    GenericTableComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSnackBarModule,
    LoadingModule,
    MatPaginatorModule,
    MatTooltipModule
  ],
  exports: [
    GenericTableComponent,
  ]
})
export class GenericTableModule { }
