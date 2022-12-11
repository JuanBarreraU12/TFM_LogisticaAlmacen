import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/interfaces/order.interface';
import { Warehouse } from 'src/app/interfaces/warehouse.interface';
import { OrdersService } from 'src/app/services/orders.service';
import * as dayjs from 'dayjs';
import Swal from 'sweetalert2';
import { WarehouseService } from 'src/app/services/warehouses.service';
import { Util } from 'src/app/classes/util';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
})
export class OrderFormComponent implements OnInit {
  action: String = 'Create';
  warehouses: Warehouse[] = [];
  warehousesByUser: Warehouse[] = [];
  orderForm: FormGroup;
  controlDisable: boolean = false;
  constructor(
    private warehousesService: WarehouseService,
    private ordersService: OrdersService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.orderForm = new FormGroup(
      {
        outDate: new FormControl('', [Validators.required]),
        truckPlate: new FormControl('', [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(10),
        ]),
        origin: new FormControl('', [this.warehouseValidator]),
        destiny: new FormControl('', [this.warehouseValidator]),
        comment: new FormControl('', []),
      },
      [this.checkWarehouses]
    );
  }

  async ngOnInit(): Promise<void> {
    let userSession = Util.getUserSession();
    this.warehouses = await this.warehousesService.getAllWarehouse();
    this.warehousesByUser = await this.warehousesService.getByUser(userSession.user_id);
    console.log(this.warehousesByUser);
    this.activatedRoute.params.subscribe(async (params: any) => {
      let id = parseInt(params.orderId);
      if (id) {
        this.action = 'Edit';
        try {
          let response = await this.ordersService.getById(id);
          if (response.id) {
            if (
              response.stateId === 2 ||
              response.stateId === 4 ||
              response.stateId === 5 ||
              response.stateId === 6
            )
              this.controlDisable = true;

            this.orderForm = new FormGroup(
              {
                id: new FormControl(response.id, []),
                outDate: new FormControl(
                  {
                    value: dayjs(response.out_date).format('YYYY-MM-DD'),
                    disabled: this.controlDisable,
                  },
                  [Validators.required]
                ),
                truckPlate: new FormControl(
                  {
                    value: response.truck_plate,
                    disabled: this.controlDisable,
                  },
                  [
                    Validators.required,
                    Validators.minLength(7),
                    Validators.maxLength(10),
                  ]
                ),
                origin: new FormControl(
                  { value: response.originId, disabled: this.controlDisable },
                  [this.warehouseValidator]
                ),
                destiny: new FormControl(
                  { value: response.destinyId, disabled: this.controlDisable },
                  [this.warehouseValidator]
                ),
                comment: new FormControl(
                  { value: response.comment, disabled: this.controlDisable },
                  []
                ),
              },
              [this.checkWarehouses]
            );
          }
        } catch (error) {
          Swal.fire(String(error), '', 'error');
        }
      }
    });
  }

  async getDataForm(): Promise<void> {
    let order: Order = {
      id: this.orderForm.value.id,
      out_date: this.orderForm.value.outDate,
      truck_plate: this.orderForm.value.truckPlate,
      originId: this.orderForm.value.origin,
      destinyId: this.orderForm.value.destiny,
      stateId: 1,
      comment: this.orderForm.value.comment,
    };

    if (order.id) {
      try {
        let response = await this.ordersService.update(order.id, order);
        if (response.affectedRows > 0)
          this.router.navigate(['/home', 'orderlist']);
      } catch (error: any) {
        error.error.forEach((err: any) => {
          Swal.fire(err.error, '', 'error');
        });
      }
    } else {
      try {
        let response = await this.ordersService.create(order);
        if (response.id) this.router.navigate(['/home', 'orderlist']);
      } catch (error: any) {
        error.error.forEach((err: any) => {
          Swal.fire(err.error, '', 'error');
        });
      }
    }
  }

  warehouseValidator(pControlName: AbstractControl): any {
    const warehouse: number = parseInt(pControlName.value);
    if (isNaN(warehouse)) {
      return { warehouseValidator: 'You must select a warehouse' };
    }
  }

  checkWarehouses(pFormValue: AbstractControl): any {
    const origin: number = parseInt(pFormValue.get('origin')?.value);
    const destiny: number = parseInt(pFormValue.get('destiny')?.value);

    if (!isNaN(origin) && origin === destiny) {
      return { checkwarehouses: true };
    } else return null;
  }

  changeOrigin(event: any): void {
    this.orderForm.value.origin = event.target.value;
  }

  changeDestiny(event: any): void {
    this.orderForm.value.destiny = event.target.value;
  }

  checkControl(pControlName: string, pError: string): boolean {
    if (
      this.orderForm.get(pControlName)?.hasError(pError) &&
      this.orderForm.get(pControlName)?.touched
    ) {
      return true;
    } else {
      return false;
    }
  }
}
