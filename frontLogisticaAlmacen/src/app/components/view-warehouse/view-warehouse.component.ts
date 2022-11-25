import { Component, OnInit } from '@angular/core';
import { Warehouse } from 'src/app/interfaces/warehouse.interface';
import { WarehouseService } from 'src/app/services/warehouse.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-warehouse',
  templateUrl: './view-warehouse.component.html',
  styleUrls: ['./view-warehouse.component.css']
})
export class ViewWarehouseComponent implements OnInit {

  arrWarehouse: Warehouse[] = []

  constructor(
    private werehouseServices: WarehouseService
  ) { }

  ngOnInit(): void {
    this.getWarehouse()
  }

  async getWarehouse(): Promise<void>{
    try {
      let response = await this.werehouseServices.getAllWarehouse()
      this.arrWarehouse = response
    } catch (err) { }
  }

  deleteWarehouse(pWarehouse: number | undefined): void {
    Swal.fire({
      title: "Deseas borrar al Warehouse",
      showDenyButton: true,
      confirmButtonText: 'Aceptar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        if (pWarehouse !== undefined) {
          this.werehouseServices.delete(pWarehouse).then(response => {
            if (response != null) {
              Swal.fire(
              'OK!',
              'Usuario borrado',
              'success')
              this.getWarehouse()
            }
          })
        }
      }
    })
  }

}
