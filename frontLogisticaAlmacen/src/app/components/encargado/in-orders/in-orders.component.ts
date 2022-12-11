import { Component, OnInit } from '@angular/core';
import { Util } from 'src/app/classes/util';
import { OrdersService } from 'src/app/services/orders.service';
import { Order } from 'src/app/interfaces/order.interface';

@Component({
  selector: 'app-in-orders',
  templateUrl: './in-orders.component.html',
  styleUrls: ['./in-orders.component.css'],
})
export class InOrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(private ordersService: OrdersService) {}

  async ngOnInit(): Promise<void> {
    let userSession = Util.getUserSession();
    if (userSession) {
      try {
        this.orders = await this.ordersService.getOrdersIn(userSession.user_id);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
