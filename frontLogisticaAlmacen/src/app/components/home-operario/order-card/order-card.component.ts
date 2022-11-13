import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/interfaces/order.interface';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css']
})
export class OrderCardComponent implements OnInit {

  @Input() myOrder: Order | any;
  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
  }

}
