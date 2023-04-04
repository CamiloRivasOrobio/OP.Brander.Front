import { OnInit, Component, Input, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenericService } from 'src/app/shared/services/generic.service';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent implements OnInit {
  @Output() selected = new EventEmitter<number>();
  @Output() dateil = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>();
  @Output() pdf = new EventEmitter<number>();
  @Input("columns") columns: any = [];
  @Input("table") table: string = "";
  @Input("filter") filter: any = "";
  @Input("options") options: any = [];
  public loading: boolean = false;
  public data: any[] = [];
  public pageSize: number = 5;
  public pageNumber: number = 0;
  public totalItems: number = 0;
  constructor(private genericService: GenericService, public dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.Get();
  }
  ChangePage(event: any) {
    this.loading = true;
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;
    this.Get();
  }
  Get() {
    this.genericService.GetAll(
      this.table + '?PageNumber=' + (this.pageNumber + 1) + '&PageSize=' + this.pageSize, this.filter).subscribe(data => {
        this.data = data.data;
        this.pageSize = data.pageSize;
        this.totalItems = data.totalItems;
        setTimeout(() => {
          this.loading = false;
        }, 400);
      }, error => {
        console.error(error);
        this.openSnackBar(error.error.Message);
      });
  }
  DeletePeople(id: number) {
    this.loading = true;
    Swal.fire({
      title: '¿Estas seguro?',
      text: "no podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.genericService.Delete(this.table, id).subscribe(data => {
          this.openSnackBar(data.message);
        }, error => {
          console.error(error);
          this.openSnackBar(error.error.Message);
          this.loading = false;
        });
      }
    })
  }
  DetailOrEditItem(id: number, type: number) {
    this.loading = true;
    if (type == 1)
      this.dateil.emit(id);
    if (type == 2)
      this.edit.emit(id);
    if (type == 3)
      this.pdf.emit(id);
    setTimeout(() => {
      this.loading = false;
    }, 900);
  }
  SeletedItem(id: number, estado: any, validationSelect: boolean | any) {
    this.loading = true;
    if (estado == 0 || validationSelect == false)
      this.selected.emit(id);
    else
      this.openSnackBar("El registro con la id: " + id + " esta deshabilitado.");
  }
  openSnackBar(message: string) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: "Se ha realizado la acción exitosamente!",
      showConfirmButton: false,
      timer: 1200
    }).then(() => {
      setTimeout(() => {
        this.loading = false;
        this.Get();
      }, 1000);
    });

  }
  ChangeStaTus(id: number) {
    this.loading = true;
    Swal.fire({
      title: '¿Estas seguro?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.genericService.ChangeStatus(this.table, id).subscribe(data => {
          this.loading = false;
          this.Get();
          this.openSnackBar(data.message);
        }, error => {
          console.error(error);
          this.openSnackBar(error.error.Message);
          this.loading = false;
        });
      }
    })
  }
}