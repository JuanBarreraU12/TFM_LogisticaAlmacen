import { Component, OnInit } from '@angular/core';
import { Warehouse } from 'src/app/interfaces/warehouse.interface';
import { WarehouseService } from 'src/app/services/warehouses.service';
import Swal from 'sweetalert2';
import { LocationsService } from 'src/app/services/locations.service';
import { Location } from 'src/app/interfaces/location.interface';

@Component({
  selector: 'app-view-warehouse',
  templateUrl: './view-warehouse.component.html',
  styleUrls: ['./view-warehouse.component.css']
})
export class ViewWarehouseComponent implements OnInit {

  arrWarehouse: Warehouse[] = []
  warehouseId : number = 0;
  arrLocations: Location[] = [];

  constructor(
    private werehouseServices: WarehouseService,
    private locationService: LocationsService
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
      title: "Do you want to delete the warehouse?",
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        if (pWarehouse !== undefined) {
          this.werehouseServices.delete(pWarehouse).then(response => {
            if (response != null) {
              Swal.fire(
              'OK!',
              'warehouse removed',
              'success')
              this.getWarehouse()
            }
          })
        }
      }
    })
  }

  async viewWarehouse(warehouseId : number| undefined)
  {
    try {
      if (warehouseId !== undefined)
      {
        this.warehouseId=warehouseId;
        let response = await this.locationService.getLocationByWarehouseId(this.warehouseId);
        this.arrLocations = response;
      }
    } catch (err) {
      console.log(err)
    }
  }

  async addWarehouse(warehouseId : number| undefined)
  {
    try {
      if (warehouseId !== undefined)
      {
        this.warehouseId=warehouseId;
      }
    } catch (err) {
      console.log(err)
    }
  }

}
