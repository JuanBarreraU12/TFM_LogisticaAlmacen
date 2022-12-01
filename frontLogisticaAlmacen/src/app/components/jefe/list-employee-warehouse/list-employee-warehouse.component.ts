import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private warehouseServices: WarehouseService,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(async (params: any) => {
      let id: number = parseInt(params.idemployee);
      let response = await this.warehouseServices.getWarehousebyIdEmployee(id);
      this.arrWarehouse = response;
    } )
  }
}
