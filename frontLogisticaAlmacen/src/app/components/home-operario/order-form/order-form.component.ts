import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/interfaces/order.interface';
import { Warehouse } from 'src/app/interfaces/warehouse.interface';
import { OrdersService } from 'src/app/services/orders.service';
import { WarehousesService } from 'src/app/services/warehouses.service';
import * as dayjs from 'dayjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
})
export class OrderFormComponent implements OnInit {
  action: String = 'Ingresar';
  warehouses: Warehouse[] = [];
  orderForm: FormGroup;
  constructor(
    private warehousesServices: WarehousesService,
    private ordersService: OrdersService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.orderForm = new FormGroup(
      {
        outDate: new FormControl('', []),
        truckPlate: new FormControl('', []),
        origin: new FormControl('', []),
        destiny: new FormControl('', []),
        comment: new FormControl('', []),
      },
      []
    );
  }

  async ngOnInit(): Promise<void> {
    this.warehouses = await this.warehousesServices.getAll();
    this.activatedRoute.params.subscribe(async (params: any) => {
      let id = parseInt(params.orderId);
      if (id) {
        this.action = 'Actualizar';
        try {
          let response = await this.ordersService.getById(id);
          if (response.id) {
            this.orderForm = new FormGroup({
              id: new FormControl(response.id, []),
              outDate: new FormControl(dayjs(response.out_date).format('YYYY-MM-DD'), []),
              truckPlate: new FormControl(response.truck_plate, []),
              origin: new FormControl(response.originId, []),
              destiny: new FormControl(response.destinyId, []),
              comment: new FormControl(response.comment, []),
            }, []);
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
    console.log(order);

    if (order.id) {
    } else {
      try {
        let response = await this.ordersService.create(order);
        if (response.id) 
          this.router.navigate(['/home-operario', 'home']);
      } catch (error) {
        Swal.fire(String(error), '', 'error');
      }
    }
  }

  changeOrigin(event: any): void {
    this.orderForm.value.origin = event.target.value;
    console.log(this.orderForm.value.origin);
  }

  changeDestiny(event: any): void {
    this.orderForm.value.destiny = event.target.value;
    console.log(this.orderForm.value.destiny);

  }
}
