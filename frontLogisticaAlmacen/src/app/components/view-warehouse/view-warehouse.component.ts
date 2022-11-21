import { Component, OnInit } from '@angular/core';
import { Warehouse } from 'src/app/interfaces/warehouse.interface';
import { WarehouseService } from 'src/app/services/warehouse.service';

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
    } catch (err) {

    }
  }

}
