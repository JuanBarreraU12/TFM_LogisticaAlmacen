import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { identity } from 'rxjs';
import { OrderDetail } from 'src/app/interfaces/order-detail.interface';
import { Order } from 'src/app/interfaces/order.interface';
import { OrdersDetailsService } from 'src/app/services/orders-details.service';
import { OrdersService } from 'src/app/services/orders.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css'],
})
export class OrderViewComponent implements OnInit {
  order: Order | any;
  orderDetails: OrderDetail[] = [];
  newOrderDetails: OrderDetail[] = [];
  orderDetailsDeleted: Number[] = [];
  anyUpdate: Boolean = false;

  constructor(
    private ordersService: OrdersService,
    private ordersDetailsService: OrdersDetailsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any) => {
      let id = parseInt(params.orderId);
      let ok = true;
      if (id) {
        let response;
        try {
          response = await this.ordersService.getById(id);
        } catch (error: any) {
          error.error.forEach((err: any) => {
            Swal.fire(err.error, '', 'error');
          });
          ok = false;
        }

        if (ok) {
          try {
            this.order = response;
            response = await this.ordersDetailsService.getAll(id);
          } catch (error: any) {
            error.error.forEach((err: any) => {
              Swal.fire(err.error, '', 'error');
            });
            ok = false;
          }
        }

        if (ok) this.orderDetails = response;
      }
    });
  }

  async deleteDetail(event: any): Promise<void> {
    const control = event.target;
    const row = control.closest('[data-detail-ml-id]');
    let id = parseInt(row.dataset.detailId);
    let materialLocationId = parseInt(row.dataset.detailMlId);

    if (id) {
      this.orderDetailsDeleted.push(id);
      let tempArray = this.orderDetails.filter((od) => od.id !== id);
      this.orderDetails = tempArray;
    } else {
      let tempArray = this.orderDetails.filter(
        (od) => od.materialLocationId !== materialLocationId
      );
      this.orderDetails = tempArray;
      tempArray = this.newOrderDetails.filter(
        (od) => od.materialLocationId !== materialLocationId
      );
      this.newOrderDetails = tempArray;
    }
  }

  getQuantity(event: any): void {
    const control = event.target;
    const row = control.closest('[data-detail-ml-id]');
    const tdStock = row.querySelector('#stock');
    let stock = parseInt(tdStock?.textContent);
    let quantity = parseInt(control.value);
    row.setAttribute('data-detail-updated', true);
    this.anyUpdate = true;
  }

  async saveDetails(): Promise<void> {
    let ok: Boolean = await this.updateDetails();

    if (ok) ok = await this.deleteDetails();

    if (ok) ok = await this.createDetails();

    if (ok) {
      this.newOrderDetails = [];
      this.orderDetailsDeleted = [];
      this.orderDetails = [];
      this.anyUpdate = false;
      try {
        let response = await this.ordersDetailsService.getAll(this.order.id);
        this.orderDetails = response;
      } catch (error) {
        console.log(error);
      }
    }
  }

  async updateDetails(): Promise<Boolean> {
    const details = document.querySelector('#details');
    const updatedRows = details?.querySelectorAll(
      'tr[data-detail-updated="true"]'
    );
    let ok = true;
    let index = 0;
    if (updatedRows) {
      while (ok && index < updatedRows.length) {
        const id = parseInt(updatedRows[index].getAttribute('data-detail-id')!);
        const materialLocationId = parseInt(
          updatedRows[index].getAttribute('data-detail-ml-id')!
        );
        let quantity = (<HTMLInputElement>(
          updatedRows[index].querySelector('#quantity')
        )).value;

        if (id) {
          let orderDetail: OrderDetail = {
            materialLocationId: materialLocationId,
            quantity: parseInt(quantity),
          };

          try {
            let response = await this.ordersDetailsService.update(
              this.order.id,
              id,
              orderDetail
            );
            if (response.affectedRows > 0)
              console.log('Actualización correcta');
          } catch (error) {
            ok = false;
            console.log(error);
          }
        } else {
          let tempArray = this.newOrderDetails.filter(
            (od) => od.materialLocationId !== materialLocationId
          );
          this.newOrderDetails = tempArray;

          let orderDetail: OrderDetail = {
            materialLocationId: materialLocationId,
            quantity: parseInt(quantity),
          };

          try {
            let response = await this.ordersDetailsService.create(
              this.order.id,
              orderDetail
            );
            if (response.id)
              console.log('Creación correcta con actualización de cantidades');
          } catch (error) {
            ok = false;
            console.log(error);
          }
        }

        updatedRows[index].setAttribute('data-detail-updated', 'false');
        index++;
      }
    }

    return ok;
  }

  async deleteDetails(): Promise<Boolean> {
    let ok = true;
    let index = 0;
    while (ok && index < this.orderDetailsDeleted.length) {
      try {
        let response = await this.ordersDetailsService.deleteById(
          this.order.id,
          this.orderDetailsDeleted[index]
        );
        if (response.affectedRows > 0) console.log('Eliminación correcta');
      } catch (error) {
        ok = false;
        console.log(error);
      }
      index++;
    }

    return ok;
  }

  async createDetails(): Promise<Boolean> {
    let ok = true;
    let index = 0;

    while (ok && index < this.newOrderDetails.length) {
      try {
        let response = await this.ordersDetailsService.create(
          this.order.id,
          this.newOrderDetails[index]
        );
        if (response.id)
          console.log('Creación correcta sin actualización de cantidades');
      } catch (error) {
        ok = false;
        console.log(error);
      }
      index++;
    }

    return ok;
  }

  addNewDetails(event: any): void {
    this.newOrderDetails.push(...event);
  }
}
