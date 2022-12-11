import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Warehouse } from 'src/app/interfaces/warehouse.interface';
import { WarehouseService } from 'src/app/services/warehouses.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-warehouses',
  templateUrl: './form-warehouses.component.html',
  styleUrls: ['./form-warehouses.component.css'],
})
export class FormWarehousesComponent implements OnInit {
  userForm: FormGroup;
  type: string = 'Create';
  idWarehouse: number = 0;

  constructor(
    private warehouseService: WarehouseService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.userForm = new FormGroup(
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
    let newWarehouse = this.userForm.value;
    if (newWarehouse.id > 0) {
      let response = await this.warehouseService.update(newWarehouse);
      if (response.affectedRows > 0)
        this.router.navigate(['/home', 'warehouseslist']);
    } else {
      let warehouseResponse = await this.warehouseService.create(newWarehouse);
      if (warehouseResponse.id)
        this.router.navigate(['/home', 'warehouseslist']);
    }
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(async (params: any) => {
      this.idWarehouse = params.idwarehouse;
      let id: number = parseInt(params.idwarehouse);
      if (id) {
        this.type = 'Update';
        const response = await this.warehouseService.getById(id);
        const warehouse: Warehouse = response;
        this.userForm = new FormGroup(
          {
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
            id: new FormControl(id, []),
          },
          []
        );
      }
    });
  }

  checkControl(pControlWarehouse: string, pError: string): boolean {
    if (
      this.userForm.get(pControlWarehouse)?.hasError(pError) &&
      this.userForm.get(pControlWarehouse)?.touched
    ) {
      return true;
    } else {
      return false;
    }
  }
}
