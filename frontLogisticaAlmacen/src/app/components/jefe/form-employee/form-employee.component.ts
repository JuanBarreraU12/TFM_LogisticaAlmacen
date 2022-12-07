import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Rol } from 'src/app/interfaces/rol.interface';
import { Warehouse } from 'src/app/interfaces/warehouse.interface';
import { EmployeeService } from 'src/app/services/employee.service';
import { RolService } from 'src/app/services/rol.service';
import { WarehouseService } from 'src/app/services/warehouse.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
import { Employee } from 'src/app/interfaces/employee.interface';
import * as dayjs from 'dayjs';
import { User_warehouse } from 'src/app/interfaces/user_warehouses.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form-employee.component.html',
  styleUrls: ['./form-employee.component.css'],
})
export class FormEmployeeComponent implements OnInit {
  arrRol: Rol[] = [];
  arrWarehouse: Warehouse[] = [];
  userForm: FormGroup;
  type: string = 'Register';
  rolSelected: number = 0;
  warehouseSelected: number = 0;
  arrawarehouseSelected: User_warehouse[] = [];
  masterSelected: boolean = false;
  arrWarehouseSelected: Warehouse[] = [];

  constructor(
    private employeeServices: EmployeeService,
    private rolServices: RolService,
    private warehouseService: WarehouseService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private userService: UsersService
  ) {
    this.userForm = new FormGroup(
      {
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ]),

        first_last_name: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ]),

        second_last_name: new FormControl('', [Validators.required]),

        email: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/),
        ]),

        dni: new FormControl('', [Validators.required]),

        cell_phone: new FormControl('', [Validators.required]),

        birth_date: new FormControl('', [Validators.required]),
      },
      []
    );
  }

  async getDataForm(): Promise<void> {
    if (this.userForm.valid) {
    } else {
      Swal.fire('Informacion!', 'El formulario no esta bien relleno', 'info');
    }
    //ACTUALIZAR
    let infoFormulario = this.userForm.value;
    if (infoFormulario.id) {
      let validar: boolean = false;
      for (let item of this.arrWarehouse) {
        if (item.isSelected) {
          validar = true;
        }
      }

      if (validar) {
        if (this.rolSelected > 0) {
          let response = await this.employeeServices.update(infoFormulario);







          if (response.affectedRows) {
            Swal.fire('OK!', 'Employee actualizado', 'success').then(
              (result) => {
                this.router.navigate(['/home', 'viewEmployee']);
              }
            );
          } else {
            Swal.fire('Error!', response.error, 'error').then((result) => {});
          }
        } else {
          Swal.fire('Error!', 'Debe seleccionar un rol', 'error').then(
            (result) => {}
          );
        }
      } else {
        Swal.fire(
          'Error!',
          'Debe seleccionar almenos un almacen',
          'error'
        ).then((result) => {});
      }
    } else {
      //CREACION
      let validar: boolean = false;
      for (let item of this.arrWarehouse) {
        if (item.isSelected) {
          validar = true;
        }
      }
      if (validar) {
        if (this.rolSelected > 0) {
          let employeeResponse = await this.employeeServices.create(
            infoFormulario
          );
          if (employeeResponse.id) {
            infoFormulario.password = infoFormulario.dni;
            infoFormulario.username = infoFormulario.email;
            infoFormulario.employee_id = employeeResponse.id;
            infoFormulario.role_id = this.rolSelected;

            let userResponse = await this.employeeServices.register(
              infoFormulario
            );
            if (userResponse.id) {
              infoFormulario.user_id = userResponse.id;
              infoFormulario.warehouse_id = this.warehouseSelected;
              for (let item of this.arrWarehouse) {
                if (item.isSelected) {
                  const warehouseSelected = {
                    user_id: userResponse.id,
                    warehouse_id: item.id,
                  };
                  this.arrawarehouseSelected.push(warehouseSelected);
                }
              }
              infoFormulario.users_warehouses = this.arrawarehouseSelected;
              let userWarehouseResponse = await this.userService.userswarehouse(
                infoFormulario
              );
              if (userWarehouseResponse != null) {
                Swal.fire('OK!', 'Employee created', 'success').then((result) => {
                  this.router.navigate(['/home', 'viewEmployee']);
                });
              }
            }
          } else {
            Swal.fire('Error!', 'There is an error', 'error').then((result) => {});
          }
        } else {
          Swal.fire('Error!', 'Debe seleccionar un rol', 'error').then(
            (result) => {}
          );
        }
      } else {
        Swal.fire(
          'Error!',
          'Debe seleccionar almenos un almacen',
          'error'
        ).then((result) => {});
      }
    }
  }

  ngOnInit(): void {
    this.getRoles();
    this.getWarehouses();
    this.activateRoute.params.subscribe(async (params: any) => {
      let id: number = parseInt(params.idemployee);
      if (id) {
        this.type = 'Update';
        const response = await this.employeeServices.getById(id);
        const employee: Employee = response;
        this.rolSelected = employee?.rol.id || 0;
        const warehouseSelected = await this.warehouseService.getWarehousebyIdEmployee(id);
        for(let item of warehouseSelected)
        {
          item.isSelected=true;
          this.arrWarehouseSelected.push(item);
        }

        for(let item of this.arrWarehouse)
        {
          for(let item2 of this.arrWarehouseSelected)
          {
            if(item.id===item2.id)
            {
              item.isSelected=true;
            }
          }
        }
        this.userForm = new FormGroup(
          {
            name: new FormControl(employee?.name, []),
            first_last_name: new FormControl(employee?.first_last_name, []),
            second_last_name: new FormControl(employee?.second_last_name, []),
            email: new FormControl(employee?.email, []),
            dni: new FormControl(employee?.dni, []),
            cell_phone: new FormControl(employee?.cell_phone, []),
            birth_date: new FormControl(
              dayjs(employee?.birth_date).format('YYYY-MM-DD'),
              [Validators.required]
            ),
            id: new FormControl(id, []),
          },
          []
        );
      }
    });
  }

  checkControl(pControlName: string, pError: string): boolean {
    if (
      this.userForm.get(pControlName)?.hasError(pError) &&
      this.userForm.get(pControlName)?.touched
    ) {
      return true;
    } else {
      return false;
    }
  }

  async getRoles(): Promise<void> {
    try {
      let response = await this.rolServices.getAll();
      this.arrRol = response;
    } catch (err) {
      console.log(err);
    }
  }

  async getWarehouses(): Promise<void> {
    try {
      let response = await this.warehouseService.getAllWarehouse();
      for (let item of response) {
        const warehouse = {
          id: item.id,
          description: item.description,
          address: item.address,
          isSelected: false,
        };
        this.arrWarehouse.push(warehouse);
      }
    } catch (err) {}
  }

  seleccionarRol($event: any) {
    this.rolSelected = parseInt($event.target.value);
  }
  seleccionarAlmacen($event: any) {
    this.warehouseSelected = parseInt($event.target.value);
  }

  // Check All Checkbox Checked
  isAllSelected(warehouse: Warehouse) {
    const index: number = this.arrWarehouse.indexOf(warehouse);
    if (index !== -1) {
      const newElement = warehouse;
      if (newElement.isSelected) newElement.isSelected = false;
      else newElement.isSelected = true;
      this.arrWarehouse[index] = newElement;
    }
    return warehouse;
  }

  Actualizar() {}

  Crear() {}
}
