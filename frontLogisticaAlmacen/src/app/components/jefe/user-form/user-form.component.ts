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
import { WarehousesService } from 'src/app/services/warehouses.service';
import { UsersService } from 'src/app/services/users.service';
import * as dayjs from 'dayjs';
import { UserWarehouse } from 'src/app/interfaces/user-warehouse.interface';
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

  constructor(
    private rolesService: RolesService,
    private warehousesService: WarehousesService,
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
      password: this.userForm.value.dni,
      roleId: this.userForm.value.role,
    };

    if (user.id) {
      // ACTUALIZACIÓN
      try {
        let response = await this.usersService.update(user.id, user);
        if (response.affectedRows > 0)
          ok = await this.saveUsersWarehouses(user.id);
      } catch (error) {
        console.log(error);
      }
    } else {
      //CREACION
      console.log(user);
      try {
        let response = await this.usersService.register(user);
        if (response.id) ok = await this.saveUsersWarehouses(response.id);
      } catch (error) {
        console.log(error);
      }
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
            try {
              let response = await this.warehousesService.getByUser(user.id);
              this.arrUsersWarehouses = response;
              this.selectCheckbox();
            } catch (error) {
              console.log(error);
            }
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
                phone: new FormControl(user?.cell_phone, []),
                birth_date: new FormControl(
                  dayjs(user?.birth_date).format('YYYY-MM-DD'),
                  []
                ),
                role: new FormControl(user?.roleId, [this.roleValidator]),
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
      let response = await this.warehousesService.getAll();
      this.warehouses = response;
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

  selectCheckbox() {
    const checkGroup = document.querySelector('#checkGroup');
    const checkbox = checkGroup?.querySelectorAll('input[type="checkbox"]');
    if (checkbox) {
      checkbox.forEach((check) => {
        let index = this.arrUsersWarehouses.findIndex((w => w.id === parseInt((<HTMLInputElement>(check)).value)));
        if (index !== -1)
          (<HTMLInputElement>(check)).checked = true;
      })
    }
  }

  async saveUsersWarehouses(pUserId: number): Promise<boolean> {
    let ok = true;
    const checkGroup = document.querySelector('#checkGroup');
    const checkbox = checkGroup?.querySelectorAll('input[type="checkbox"]');
    let index = 0;

    if (checkbox) {
      if (this.arrUsersWarehouses.length > 0) {
        // Es actualización
        while (ok && index < checkbox.length) {
          let isChecked = (<HTMLInputElement>checkbox[index]).checked;
          let val = parseInt((<HTMLInputElement>checkbox[index]).value);
          let warehouse = this.arrUsersWarehouses.find((x) => x.id === val);
          if (isChecked && !warehouse) {
            // Se agrega
            try {
              let newUserWarehouse: UserWarehouse = {
                user_id: pUserId,
                warehouse_id: val,
              };

              let response = await this.usersWarehousesService.create(
                newUserWarehouse
              );
            } catch (error) {
              ok = false;
              console.log(error);
            }
          } else if (!isChecked && warehouse) {
            // Se elimina
            try {
              let response = await this.usersWarehousesService.delete(warehouse.user_warehouse_id!);
            } catch (error) {
              ok = false;
              console.log(error);
            }
          }

          index++;
        }
      } else {
        // Es inserción
        while (ok && index < checkbox.length) {
          let isChecked = (<HTMLInputElement>checkbox[index]).checked;
          let val = parseInt((<HTMLInputElement>checkbox[index]).value);
          if (isChecked) {
            // Se agrega
            try {
              let newUserWarehouse: UserWarehouse = {
                user_id: pUserId,
                warehouse_id: val,
              };

              let response = await this.usersWarehousesService.create(
                newUserWarehouse
              );
            } catch (error) {
              ok = false;
              console.log(error);
            }
          }

          index++;
        }
      }
    }

    return ok;
  }

  Actualizar() {}

  Crear() {}
}
