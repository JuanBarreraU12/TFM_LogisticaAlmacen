import { Component, OnInit } from '@angular/core';
import { Warehouse } from 'src/app/interfaces/warehouse.interface';
import { WarehousesService } from 'src/app/services/warehouses.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-warehouse',
  templateUrl: './view-warehouse.component.html',
  styleUrls: ['./view-warehouse.component.css'],
})
export class ViewWarehouseComponent implements OnInit {
  arrWarehouse: Warehouse[] = [];

  constructor(private warehousesService: WarehousesService) {}

  ngOnInit(): void {
    this.getWarehouse();
  }

  async getWarehouse(): Promise<void> {
    try {
      let response = await this.warehousesService.getAll();
      this.arrWarehouse = response;
    } catch (err) {
      console.log(err);
    }
  }

  deleteWarehouse(pWarehouse: number | undefined): void {
    Swal.fire({
      title: `¿Do you want to delete the warehouse #${pWarehouse}?`,
      text: '¡This action is irreversible!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#6c757d',
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Delete',
      heightAuto: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          if (pWarehouse) {
            let response = await this.warehousesService.delete(pWarehouse);
            if (response.affectedRows > 0) {
              Swal.fire({
                title: 'Deleted!',
                text: `The warehouse #${pWarehouse} was deleted`,
                icon: 'success',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#6c757d',
                heightAuto: false,
              });
              this.getWarehouse();
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  }
}
