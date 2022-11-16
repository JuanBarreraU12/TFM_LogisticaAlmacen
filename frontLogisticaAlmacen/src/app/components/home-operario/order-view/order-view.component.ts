import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  async deleteDetail(event: any): Promise<void>{
    const control = event.target;
    let id = parseInt(control.dataset.detailDeleted);
    
    try {
      let response = await this.ordersDetailsService.deleteById(this.order.id, id);
      if (response.affectedRows) {
        let tempArray = this.orderDetails.filter(od => od.id !== id);
        this.orderDetails = tempArray;
      }
    } catch (error: any) {
      console.log(error.error);
    }
  }
}
