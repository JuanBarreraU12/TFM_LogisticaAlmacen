import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Rol } from 'src/app/interfaces/rol.interface';
import { User } from 'src/app/interfaces/user.interface';
import { Werehouse } from 'src/app/interfaces/werehouse.interface';
import { EmployeeService } from 'src/app/services/employee.service';
import { RolService } from 'src/app/services/rol.service';
import { WerehouseService } from 'src/app/services/werehouse.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./formEmployee.component.css']
})
export class FormComponent implements OnInit {

  arrRol: Rol[] = [];
  arrWerehouse: Werehouse[] = [];
  userForm: FormGroup
  type: string = 'Registrar';
 

  constructor(
    private employeeServices: EmployeeService,
    private rolServices: RolService,
    private werehouseService: WerehouseService,
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
        infoFormulario.role_id = 1;
        let userResponse = await this.userService.register(infoFormulario);
        if (userResponse.id) { 
          infoFormulario.user_id = userResponse.id;
          infoFormulario.warehouse_id = 1;
          let userWarehouseResponse = await this.userService.userswerehouse(infoFormulario);
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
    this.getWerehouses()
    this.activateRoute.params.subscribe(async(params:any) => {
      let id: number = parseInt(params.iduser);
      if (id) {
        this.type = 'Actualizar'
        const response = await this.employeeServices.getById(id)
        const user: User = response
        this.userForm = new FormGroup({
          name: new FormControl(user?.name,[]),
          first_last_name: new FormControl(user?.first_last_name, []),
          second_last_name: new FormControl(user?.second_last_name, []),
          email: new FormControl(user?.email, []),
          dni: new FormControl(user?.dni, []),
          cell_phone: new FormControl(user?.cell_phone, []),
          birth_date: new FormControl(user?.birth_date, []),
          id: new FormControl(user?.id, [])
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

  async getWerehouses(): Promise<void> {
    try {
      let response = await this.werehouseService.getAllWerehouse()
      this.arrWerehouse = response;
    } catch (err) {
      console.log(err)
    }
    


  }

}
