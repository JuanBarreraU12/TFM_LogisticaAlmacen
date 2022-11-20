import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-list-ordes',
  templateUrl: './list-ordes.component.html',
  styleUrls: ['./list-ordes.component.css']
})
export class ListOrdesComponent implements OnInit {

  orderdata: any = [];
  constructor( private OrdersService: OrdersService) {
    this.OrdersService.getAll().then(orders => {
      this.orderdata = orders;
    })
  }

  ngOnInit(): void {
  }

}
