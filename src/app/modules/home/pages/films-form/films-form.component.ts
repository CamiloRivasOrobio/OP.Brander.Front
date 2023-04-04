import { DatePipe } from '@angular/common';
import { Inject, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Formats } from 'src/app/core/models/formats/formats';
import { Genders } from 'src/app/core/models/genders/genders';
import { GenericService } from 'src/app/shared/services/generic.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-films-form',
  templateUrl: './films-form.component.html',
  styleUrls: ['./films-form.component.scss']
})
export class FilmsFormComponent implements OnInit {
  public loading: boolean = true;
  public option: string = this.rutaActiva.snapshot.params['option'];
  public form: FormGroup;
  public genders: Genders[];
  public formats: Formats[];
  constructor(public formBuilder: FormBuilder, private snackBar: MatSnackBar,
    public genericService: GenericService, public router: Router, private rutaActiva: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any, private datePipe: DatePipe,
    private dialogRef: MatDialogRef<FilmsFormComponent>) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: 0,
      titulo: ['', Validators.required],
      fecha: ['', Validators.required],
      director: ['', Validators.required],
      argumento: ['', Validators.required],
      duracion: [0, Validators.required],
      genero: [0, Validators.required],
      formato: [0, Validators.required],
      estado: 0,
    });
    this.LoadData();
  }

  RegisterRoute() {
    this.loading = true;
    this.genericService.Post('Films', this.form.value).subscribe(result => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: "Se ha registrado exitosamente!",
        showConfirmButton: false,
        timer: 1200
      }).then(() => window.location.reload());
    }, error => {
      this.openSnackBar(error.error.Message);
      this.loading = false;
    });
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'x', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }
  LoadData() {
    this.loading = true;
    this.genericService.GetAll("Genders").subscribe(resultGenders => {
      this.genders = resultGenders.data;
      this.genericService.GetAll("Formats").subscribe(resultFormats => {
        this.formats = resultFormats.data;
        this.genericService.GetById('Films', this.data.id).subscribe(data => {
          this.form.controls['id'].setValue(data.data.id);
          this.form.controls['titulo'].setValue(data.data.titulo);
          this.form.controls['fecha'].setValue(this.datePipe.transform(data.data.fecha, 'yyyy-MM-dd'));
          this.form.controls['director'].setValue(data.data.director);
          this.form.controls['argumento'].setValue(data.data.argumento);
          this.form.controls['duracion'].setValue(data.data.duracion);
          this.form.controls['genero'].setValue(data.data.genero);
          this.form.controls['formato'].setValue(data.data.formato);
          this.form.controls['estado'].setValue(data.data.estado);
          setTimeout(() => {
            this.loading = false;
          }, 400);
        });
      });
    });
  }
  EditRoute() {
    this.loading = true;
    this.genericService.Put('Films', this.form.value).subscribe(result => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: "Se ha modificado exitosamente!",
        showConfirmButton: false,
        timer: 1200
      }).then(() => {
        window.location.reload();
      });
    }, error => {
      this.openSnackBar(error.error.Message);
      this.loading = false;
    });
    setTimeout(() => {
      this.loading = false;
    }, 800);
  }
}