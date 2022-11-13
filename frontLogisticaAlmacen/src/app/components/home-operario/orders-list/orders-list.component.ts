import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/interfaces/order.interface';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  orders: Order[] = [];
  constructor(private ordersService: OrdersService) { }

  async ngOnInit(): Promise<void> {
    this.orders = await this.ordersService.getAll();
    console.log(this.orders);
  }

}
