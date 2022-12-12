import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Rol } from 'src/app/interfaces/rol.interface';
import { Warehouse } from 'src/app/interfaces/warehouse.interface';
import { RolesService } from 'src/app/services/roles.service';
import { WarehouseService } from 'src/app/services/warehouses.service';
import { UsersService } from 'src/app/services/users.service';
import * as dayjs from 'dayjs';
import { User } from 'src/app/interfaces/user.interface';
import { UsersWarehousesService } from 'src/app/services/users-warehouses.service';

@Component({
  selector: 'app-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  roles: Rol[] = [];
  warehouses: Warehouse[] = [];
  userForm: FormGroup;
  type: string = 'Create';
  arrUsersWarehouses: Warehouse[] = [];
  arrWarehouse: Warehouse[] = [];
  arrWarehouseSelected: Warehouse[] = [];

  constructor(
    private rolesService: RolesService,
    private warehousesService: WarehouseService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private usersService: UsersService,
    private usersWarehousesService: UsersWarehousesService
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

        second_last_name: new FormControl('', []),

        email: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/),
        ]),

        dni: new FormControl('', [Validators.required]),

        phone: new FormControl('', []),

        birth_date: new FormControl('', []),
        role: new FormControl('', [this.roleValidator]),
      },
      []
    );
  }

  async getDataForm(): Promise<void> {
    let ok = true;
    //ACTUALIZAR
    let user: User = {
      id: this.userForm.value.id,
      name: this.userForm.value.name,
      first_last_name: this.userForm.value.first_last_name,
      second_last_name: this.userForm.value.second_last_name,
      dni: this.userForm.value.dni,
      phone: this.userForm.value.phone,
      birth_date: this.userForm.value.birth_date,
      email: this.userForm.value.email,
      password: this.userForm.value.password,
      roleId: this.userForm.value.role,
    };

    if (user.id) {
      let response = await this.usersService.update(user.id, user);
      if (response.affectedRows > 0)
        ok = await this.updateUsersWarehouses(user.id);
    } else {
      user.password = this.userForm.value.dni;
      let response = await this.usersService.register(user);
      if (response.id) ok = await this.saveUsersWarehouses(response.id);
    }

    if (ok) this.router.navigate(['/home', 'userslist']);
  }

  ngOnInit(): void {
    this.getRoles();
    this.getWarehouses();
    this.activateRoute.params.subscribe(async (params: any) => {
      let id: number = parseInt(params.userId);
      if (id) {
        this.type = 'Edit';
        try {
          let user = await this.usersService.getById(id);
          if (user.id) {
            const warehouseSelected = await this.warehousesService.getByUser(
              user.id
            );
            for (let item of warehouseSelected) {
              item.isSelected = true;
              this.arrWarehouseSelected.push(item);
            }

            for (let item of this.arrWarehouse) {
              for (let item2 of this.arrWarehouseSelected) {
                if (item.id === item2.id) {
                  item.isSelected = true;
                }
              }
            }

            let birthDate: any;
            if (user?.birth_date !== null)
              birthDate = dayjs(user?.birth_date).format('YYYY-MM-DD');

            this.userForm = new FormGroup(
              {
                id: new FormControl(id, []),
                name: new FormControl(user?.name, [
                  Validators.required,
                  Validators.minLength(3),
                  Validators.maxLength(20),
                ]),
                first_last_name: new FormControl(user?.first_last_name, [
                  Validators.required,
                  Validators.minLength(5),
                  Validators.maxLength(20),
                ]),
                second_last_name: new FormControl(user?.second_last_name, []),
                email: new FormControl(user?.email, [
                  Validators.required,
                  Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/),
                ]),
                dni: new FormControl(user?.dni, [Validators.required]),
                phone: new FormControl(user?.phone, []),
                birth_date: new FormControl(
                  birthDate,
                  []
                ),
                role: new FormControl(user?.roleId, [this.roleValidator]),
                password: new FormControl(user?.password, []),
              },
              []
            );
          }
        } catch (error) {
          console.log(error);
        }
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
      let response = await this.rolesService.getAll();
      this.roles = response;
    } catch (err) {
      console.log(err);
    }
  }

  async getWarehouses(): Promise<void> {
    try {
      let response = await this.warehousesService.getAllWarehouse();
      this.arrWarehouse = response;
    } catch (err) {
      console.log(err);
    }
  }

  roleValidator(pControlName: AbstractControl): any {
    const role: number = parseInt(pControlName.value);
    if (isNaN(role)) {
      return { roleValidator: 'You must select a role' };
    }
  }

  seleccionarRol(event: any) {
    this.userForm.value.role = event.target.value;
  }

  async saveUsersWarehouses(pUserId: number): Promise<boolean> {
    // Es inserción
    try {
      const users_warehouses = [];
      for (let item of this.arrWarehouse) {
        if (item.isSelected) {
          const newUserWarehouse = {
            users_id: pUserId,
            warehouse_id: item.id,
          };
          users_warehouses.push(newUserWarehouse);
        }
      }
      const array = { users_warehouses: users_warehouses };
      let response = await this.usersWarehousesService.create(array);
      if (response) {
        this.router.navigate(['/home', 'userslist']);
        // Swal.fire('OK!', 'Saved user', 'success').then((result) => {
        // });
      } else {
        // Swal.fire('Error!', response.error, 'error').then((result) => {});
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async updateUsersWarehouses(pUserId: number): Promise<boolean> {
    try {
      const users_warehouses = [];
      for (let item of this.arrWarehouse) {
        if (item.isSelected) {
          const newUserWarehouse = {
            users_id: pUserId,
            warehouse_id: item.id,
          };
          users_warehouses.push(newUserWarehouse);
        }
      }
      const array = {
        userId: pUserId,
        users_warehouses: users_warehouses,
      };
      let response = await this.usersWarehousesService.update(array);
      if (response) {
        this.router.navigate(['/home', 'userslist']);
        // Swal.fire('OK!', 'Updated user', 'success').then((result) => {
        // });
      } else {
        // Swal.fire('Error!', response.error, 'error').then((result) => {});
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

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
}
