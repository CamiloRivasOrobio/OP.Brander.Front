import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GenericService } from 'src/app/shared/services/generic.service';
import { FilmsFormComponent } from '../films-form/films-form.component';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent implements OnInit {
  public loading: boolean = true;
  public seleted: number;
  public table: string = 'Films';
  public dataTableRoutes: any[] | any = null;
  public columns = [
    { name: "Id", data: "id" },
    { name: "Titulo", data: "titulo" },
    { name: "Director", data: "director" },
    { name: "Duración", data: "duracion" },
    { name: "Genero", data: "generoNavigation", property: "genero" },
    { name: "Formato", data: "formatoNavigation", property: "formato" },
    { name: "Fecha", data: "fecha", pipeDate: 'shortDate' },
    { name: "Estado", data: 'estado', burnedData: { not: "Deshabilitado", yeah: "Habilitado" } }];
  public options = [{ delete: true, edit: true, details: true, select: false, state: true, pdf: false, validationSelect: false }];

  public columnsFormats = [
    { name: "Id", data: "id" },
    { name: "Formato", data: "formato" },
    { name: "Caracteristicas", data: "caracteristicas" },
    { name: "FormatoPelicula", data: "formatoPelicula" }];

  public columnsGenders = [
    { name: "Id", data: "id" },
    { name: "Genero", data: "genero" }];

  constructor(private genericService: GenericService, private router: Router, public dialog: MatDialog) {
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 1200);
  }
  OpenFormDialog(id: any, type: string, option: number) {
    this.loading = true;
    this.openDialog(id, type, option);
    setTimeout(() => {
      this.loading = false;
    }, 1200);
  }
  openDialog(id: number, type: string, option: number) {
    this.dialog.open(FilmsFormComponent, {
      data: { id: id, type: type, option: option }
    });
  }
}
