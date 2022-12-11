import { Component, OnInit } from '@angular/core';
import { Util } from 'src/app/classes/util';
import { Order } from 'src/app/interfaces/order.interface';
import { OrdersService } from 'src/app/services/orders.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  orders: Order[] = [];
  constructor(private ordersService: OrdersService) { }

  async ngOnInit(): Promise<void> {
    try {
      let userSession = Util.getUserSession();
      this.orders = await this.ordersService.getByUser(userSession.user_id);
    } catch (error: any) {
      Swal.fire(error.message, '', 'error');
    }
  }

  deleteOrder(event: any): void {
    let tempArray = this.orders.filter(o => o.id !== event);
    this.orders = tempArray;
  }

  getOrderUpdated(event: any): void {
    this.orders = [];
    this.orders = event;
  }
}
