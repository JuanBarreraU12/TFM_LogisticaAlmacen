import { Component, OnInit } from '@angular/core';
import { Warehouse } from 'src/app/interfaces/warehouse.interface';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-list-employee-warehouse',
  templateUrl: './list-employee-warehouse.component.html',
  styleUrls: ['./list-employee-warehouse.component.css']
})
export class ListEmployeeWarehouseComponent implements OnInit {

  arrWarehouse: Warehouse[] = []
  constructor(
    private warehouseServices: WarehouseService
  ) { }

  ngOnInit(): void {
    this.getWarehouse
  }
  
  async getWarehouse(): Promise<void>{
    try {
      let response = await this.warehouseServices.getAllWarehouse()
      this.arrWarehouse = response
    } catch(err) { }
  }

}
