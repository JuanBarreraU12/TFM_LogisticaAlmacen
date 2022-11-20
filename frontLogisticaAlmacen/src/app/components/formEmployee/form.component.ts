import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Rol } from 'src/app/interfaces/rol.interface';
import { Warehouse } from 'src/app/interfaces/warehouse.interface';
import { EmployeeService } from 'src/app/services/employee.service';
import { RolService } from 'src/app/services/rol.service';
import { WarehouseService } from 'src/app/services/warehouse.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
import { Employee } from 'src/app/interfaces/employee.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./formEmployee.component.css']
})
export class FormComponent implements OnInit {

  arrRol: Rol[] = [];
  arrWarehouse: Warehouse[] = [];
  userForm: FormGroup
  type: string = 'Registrar';
  rolSelected: number = 0;
  warehouseSelected: number = 0;
    

  constructor(
    private employeeServices: EmployeeService,
    private rolServices: RolService,
    private warehouseService: WarehouseService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private userService: UsersService
  ) { 
    this.userForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]),

      first_last_name: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)
      ]),

      second_last_name: new FormControl('', [
        Validators.required,
      ]),

      email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]),

      dni: new FormControl('', [
      Validators.required,
      ]),

      cell_phone: new FormControl('', [
      Validators.required,
      ]),

      birth_date: new FormControl('', [
      Validators.required,
      ])
    })

  }
  

  async getDataForm(): Promise<void>{
    if (this.userForm.valid) { }
    else {
      Swal.fire(
        'Informacion!',
        'El formulario no esta bien relleno',
        'info'
      );
    }

    let infoFormulario = this.userForm.value;
    if (infoFormulario.id) {
      let response = await this.employeeServices.update(infoFormulario);
      if (response.id) {
        Swal.fire(
          'OK!',
          'Employee actualizado',
          'success')
          .then((result) => {
            this.router.navigate(['/home-jefe']);
          });
      }
      else {
        Swal.fire(
          'Error!',
          response.error,
          'error')
          .then((result) => {
            this.router.navigate(['/home-jefe']);
          });
      }
    }  
    else {
      let employeeResponse = await this.employeeServices.create(infoFormulario)
      if (employeeResponse.id) {
        infoFormulario.password = infoFormulario.dni;
        infoFormulario.username = infoFormulario.email;
        infoFormulario.employee_id = employeeResponse.id;
        infoFormulario.role_id = this.rolSelected;
        let userResponse = await this.employeeServices.register(infoFormulario);
        if (userResponse.id) { 
          infoFormulario.user_id = userResponse.id;
          infoFormulario.warehouse_id = this.warehouseSelected;
          let userWarehouseResponse = await this.userService.userswarehouse(infoFormulario);
          if (userWarehouseResponse.id) { 
            Swal.fire(
              'OK!',
              'Usuario creado',
              'success')
              .then((result) => {
                this.router.navigate(['/home-jefe']);
            });
          }  
        }
      }
    
      else {
        Swal.fire(
          'Error!',
          'Hubo un error',
          'error')
          .then((result) => {
            this.router.navigate(['/home-jefe']);
        });
      }
    } 
  }

  ngOnInit(): void {
    this.getRoles()
    this.getWarehouses()
    this.activateRoute.params.subscribe(async(params:any) => {
      console.log(params);  
      let id: number = parseInt(params.idemployee);
      console.log(id);
      if (id) {
        this.type = 'Actualizar'
        const response = await this.employeeServices.getById(id)
        const employee: Employee = response
        this.rolSelected = employee?.rol.id || 0
        this.warehouseSelected = employee?.warehouse.id || 0
        this.userForm = new FormGroup({
          name: new FormControl(employee?.name,[]),
          first_last_name: new FormControl(employee?.first_last_name, []),
          second_last_name: new FormControl(employee?.second_last_name, []),
          email: new FormControl(employee?.email, []),
          dni: new FormControl(employee?.dni, []),
          cell_phone: new FormControl(employee?.cell_phone, []),
          birth_date: new FormControl(employee?.birth_date, []),
          id: new FormControl(employee?.id, []),
        }, [])
      }
    })
  }

  checkControl(pControlName: string, pError: string): boolean{
    if(this.userForm.get(pControlName)?.hasError(pError) && this.userForm.get(pControlName)?.touched){
      return true;
    } 
    else {
      return false;
    }
  }

  async getRoles(): Promise<void> {
    try {
      let response = await this.rolServices.getAll()
      this.arrRol = response;
    } catch (err) {
      console.log(err)
    }
  }

  async getWarehouses(): Promise<void> {
    try {
      let response = await this.warehouseService.getAllWarehouse()
      this.arrWarehouse = response;
    } catch (err) {
      console.log(err)
    }

  }

  seleccionarRol($event: any) {
    this.rolSelected = parseInt($event.target.value);
  }
  seleccionarAlmacen($event: any) {
    this.warehouseSelected = parseInt($event.target.value);
  }

}
