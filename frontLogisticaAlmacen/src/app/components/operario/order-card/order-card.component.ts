import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Order } from 'src/app/interfaces/order.interface';
import { OrdersService } from 'src/app/services/orders.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css']
})
export class OrderCardComponent implements OnInit {

  @Input() myOrder!: Order;
  @Output() orderIdDeleted: EventEmitter<Number>;
  @Output() orderUpdated: EventEmitter<Order[]>;
  actionState: string = '';
  newState: number = -1;
  display: boolean = true;
  constructor(private ordersService: OrdersService) { 
    this.orderIdDeleted = new EventEmitter();
    this.orderUpdated = new EventEmitter();
  }

  ngOnInit(): void {
    switch (this.myOrder.stateId) {
      case 1:
        this.actionState = 'Revisar';
        this.newState = 2;
        break;
      case 3:
        this.actionState = 'Revisar';
        this.newState = 2;
        break;
      case 4:
        this.actionState = 'Enviar';
        this.newState = 5;
        break;
      default:
        this.actionState = '';
        this.display = false;
        break;
    }
  }

  deleteOrder(): void {
    Swal.fire({
      title: `Do you want to delete the order #${this.myOrder.id}?`,
      text: "This action is irreversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#6c757d',
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Delete',
      heightAuto: false
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          let response = await this.ordersService.delete(this.myOrder.id!);
          if (response.affectedRows > 0) {
            Swal.fire({
              title: 'Deleted!',
              text: `The order #${this.myOrder.id} was deleted`,
              icon: 'success',
              confirmButtonText: 'Ok',
              confirmButtonColor: '#6c757d', 
              heightAuto: false
            });
            this.orderIdDeleted.emit(this.myOrder.id);
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  }

  async changeState(): Promise<void> {
    let order: any = {
      stateId: this.newState
    }

    try {
      let response = await this.ordersService.updateState(this.myOrder.id!, order);
      if (response.affectedRows) { 
        order.orderId = this.myOrder.id;
        try {
          response = await this.ordersService.getAll();
          this.orderUpdated.emit(response);
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}
