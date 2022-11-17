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
  constructor(private ordersService: OrdersService) { 
    this.orderIdDeleted = new EventEmitter();
  }

  ngOnInit(): void {
  }

  deleteOrder(): void {
    Swal.fire({
      title: `¿Desea eliminar el Pedido #${this.myOrder.id}?`,
      text: "¡Esta acción es irreversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar',
      heightAuto: false
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          let response = await this.ordersService.delete(this.myOrder.id!);
          if (response.affectedRows > 0) {
            Swal.fire({
              title: 'Eliminado!',
              text: `El pedido #${this.myOrder.id} fue eliminado`,
              icon: 'success',
              confirmButtonText: 'Ok',
              confirmButtonColor: '#3085d6', 
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

}
