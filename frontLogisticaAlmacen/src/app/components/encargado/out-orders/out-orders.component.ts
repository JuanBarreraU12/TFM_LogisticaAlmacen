import { Component, OnInit } from '@angular/core';
import { Util } from 'src/app/classes/util';
import { Order } from 'src/app/interfaces/order.interface';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-out-orders',
  templateUrl: './out-orders.component.html',
  styleUrls: ['./out-orders.component.css'],
})
export class OutOrdersComponent implements OnInit {
  orders: Order[] = [];
  constructor(
    private ordersService: OrdersService
  ) {}

  async ngOnInit(): Promise<void> {
    let userSession = Util.getUserSession();
    if (userSession) {
      try {
        this.orders = await this.ordersService.getOrdersOut(userSession.user_id);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
