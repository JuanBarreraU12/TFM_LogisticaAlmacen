import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Warehouse } from 'src/app/interfaces/warehouse.interface';
import { WarehouseService } from 'src/app/services/warehouses.service';

@Component({
  selector: 'app-list-employee-warehouse',
  templateUrl: './list-employee-warehouse.component.html',
  styleUrls: ['./list-employee-warehouse.component.css'],
})
export class ListEmployeeWarehouseComponent implements OnInit {
  arrWarehouse: Warehouse[] = [];
  constructor(
    private warehousesService: WarehouseService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe(async (params: any) => {
      let userId: number = parseInt(params.userId);
      try {
        let response = await this.warehousesService.getByUser(userId);
        this.arrWarehouse = response;
      } catch (error) {
        console.log(error);
      }
    });
  }
}
