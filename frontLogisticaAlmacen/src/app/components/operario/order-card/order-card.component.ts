import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Util } from 'src/app/classes/util';
import { OrderDetail } from 'src/app/interfaces/order-detail.interface';
import { Order } from 'src/app/interfaces/order.interface';
import { MaterialsLocationsService } from 'src/app/services/materials-locations.service';
import { OrdersDetailsService } from 'src/app/services/orders-details.service';
import { OrdersService } from 'src/app/services/orders.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css'],
})
export class OrderCardComponent implements OnInit {
  @Input() myOrder!: Order;
  @Input() index: number = 0;
  @Output() orderIdDeleted: EventEmitter<Number>;
  @Output() orderUpdated: EventEmitter<Order[]>;
  actionState: string = '';
  newState: number = -1;
  display: boolean = true;
  orderDetails: OrderDetail[] = [];
  constructor(
    private ordersService: OrdersService,
    private ordersDetailsService: OrdersDetailsService,
    private materialsLocationsService: MaterialsLocationsService
  ) {
    this.orderIdDeleted = new EventEmitter();
    this.orderUpdated = new EventEmitter();
  }

  ngOnInit(): void {
    switch (this.myOrder.stateId) {
      case 1:
        this.actionState = 'Revise';
        this.newState = 2;
        break;
      case 3:
        this.actionState = 'Revise';
        this.newState = 2;
        break;
      case 4:
        this.actionState = 'Send';
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
      title: `Do you want to delete this order?`,
      text: 'This action is irreversible!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#6c757d',
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Delete',
      heightAuto: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          let response = await this.ordersService.delete(this.myOrder.id!);
          if (response.affectedRows > 0) {
            Swal.fire({
              title: 'Deleted!',
              text: `The order was deleted`,
              icon: 'success',
              confirmButtonText: 'Ok',
              confirmButtonColor: '#6c757d',
              heightAuto: false,
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
    $('#modalSpinner').modal('show');
    let order: any = {
      stateId: this.newState,
    };

    try {
      let response = await this.ordersService.updateState(
        this.myOrder.id!,
        order
      );
      if (response.affectedRows > 0) {
        order.orderId = this.myOrder.id;

        if (order.stateId === 5) {
          try {
            this.orderDetails = await this.ordersDetailsService.getAll(
              this.myOrder.id!
            );
          } catch (error) {
            console.log(error);
          }

          let ok: boolean = true;
          let index: number = 0;

          while (ok && index < this.orderDetails.length) {
            let stock: Number =
              Number(this.orderDetails[index].stock) -
              Number(this.orderDetails[index].quantity);

            let stockObj: any = {
              stock
            }
            
            response = await this.materialsLocationsService.updateStock(Number(this.orderDetails[index].materialLocationId), stockObj);
            if (!(response.affectedRows > 0))
              ok = false;
            
            index++;
          }
        }

        try {
          let userSession = Util.getUserSession();
          response = await this.ordersService.getByUser(userSession.user_id);
          this.orderUpdated.emit(response);
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
    $('#modalSpinner').modal('hide');
  }
}
