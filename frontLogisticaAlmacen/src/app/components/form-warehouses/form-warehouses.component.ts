import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Warehouse } from 'src/app/interfaces/warehouse.interface';
import { WarehouseService } from 'src/app/services/warehouse.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-warehouses',
  templateUrl: './form-warehouses.component.html',
  styleUrls: ['./form-warehouses.component.css']
})
export class FormWarehousesComponent implements OnInit {

  userForm: FormGroup
  type: string = 'Nuevo';

  constructor(
    private warehouseService: WarehouseService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) { 
    this.userForm = new FormGroup({
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]),

      address: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60)
      ]),

    })
  }
  async getDataForm(): Promise<void>{
    if (this.userForm.valid) {}
    else {
      Swal.fire(
        'Informacion!',
        'El formulario no esta bien relleno',
        'info'
      )
    }
    let infoFormulario = this.userForm.value;
    if (infoFormulario.id) {
      let response = await this.warehouseService.update(infoFormulario);
      if (response.id) {
        Swal.fire(
          'OK!',
          'Warehouse actualizado',
          'success')
          .then((result) => {
          this.router.navigate(['/home-jefe'])
        })
      }
    }
    
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(async (params: any) => {
      let id: number = parseInt(params.idwarehouse);
      if (id) {
        this.type = 'Actualizar'
        const response = await this.warehouseService.getById(id)
        const warehouse: Warehouse = response
        this.userForm = new FormGroup({
          description: new FormControl(warehouse?.description, []),
          address: new FormControl(warehouse?.address, []),
          id: new FormControl(warehouse?.id, []),
        }, [])
      }
    })
  }

  checkControl(pControlWarehouse: string, pError: string): boolean{
    if (this.userForm.get(pControlWarehouse)?.hasError(pError) && this.userForm.get(pControlWarehouse)?.touched) {
      return true;
    }
    else {
      return false;
    }
  } 

}
