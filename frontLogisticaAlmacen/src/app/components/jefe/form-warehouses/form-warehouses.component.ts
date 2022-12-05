import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Warehouse } from 'src/app/interfaces/warehouse.interface';
import { WarehousesService } from 'src/app/services/warehouses.service';

@Component({
  selector: 'app-form-warehouses',
  templateUrl: './form-warehouses.component.html',
  styleUrls: ['./form-warehouses.component.css'],
})
export class FormWarehousesComponent implements OnInit {
  warehouseForm: FormGroup;
  type: string = 'Create';

  constructor(
    private warehousesService: WarehousesService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.warehouseForm = new FormGroup(
      {
        description: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ]),

        address: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(60),
        ]),
      },
      []
    );
  }

  async getDataForm(): Promise<void> {
    let warehouse: Warehouse = {
      id: this.warehouseForm.value.id,
      description: this.warehouseForm.value.description,
      address: this.warehouseForm.value.address,
    };

    if (warehouse.id) {
      // ACTUALIZACIÓN
      let response = await this.warehousesService.update(
        warehouse.id,
        warehouse
      );
      if (response.affectedRows > 0)
        this.router.navigate(['/home', 'warehouseslist']);
    } else {
      // CREACIÓN
      let response = await this.warehousesService.create(warehouse);
      if (response.id) this.router.navigate(['/home', 'warehouseslist']);
    }
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(async (params: any) => {
      let id: number = parseInt(params.warehouseId);
      if (id) {
        this.type = 'Edit';
        const response = await this.warehousesService.getById(id);
        const warehouse: Warehouse = response;
        this.warehouseForm = new FormGroup(
          {
            id: new FormControl(id, []),
            description: new FormControl(warehouse?.description, [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(20),
            ]),
            address: new FormControl(warehouse?.address, [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(60),
            ]),
          },
          []
        );
      }
    });
  }

  checkControl(pControlWarehouse: string, pError: string): boolean {
    if (
      this.warehouseForm.get(pControlWarehouse)?.hasError(pError) &&
      this.warehouseForm.get(pControlWarehouse)?.touched
    ) {
      return true;
    } else {
      return false;
    }
  }
}
