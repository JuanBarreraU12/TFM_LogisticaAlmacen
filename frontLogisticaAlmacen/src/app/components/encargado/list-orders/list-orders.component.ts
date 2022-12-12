import { Component, OnInit, Input } from '@angular/core';
import { OrdersService } from '../../../services/orders.service';
import { OrdersDetailsService } from 'src/app/services/orders-details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/interfaces/order.interface';
declare var $: any;

@Component({
  selector: 'app-list-ordes',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css'],
})
export class ListOrdersComponent implements OnInit {
  orderdetails: any = [];
  ruta: any = [];
  optionsin: any = [];
  optionsout: any = [];
  comment: String = '';
  opcionSeleccionado: string = '0';
  verSeleccion: string = '';
  ids: number = 0;
  @Input() entrada: string = '';
  @Input() salida: string = '';
  @Input() orders: Order[] = [];

  constructor(
    private OrdersService: OrdersService,
    private OrdersDetailsService: OrdersDetailsService,
    private activateRoute: ActivatedRoute
  ) {
    this.optionsout = ['For Deliver', 'Returned'];
    this.optionsin = ['Deliver'];
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(async (params: any) => {
      let id: number = parseInt(params.id);
      let response = await this.OrdersDetailsService.getAll(id);
      this.orderdetails = response;
    });

    this.activateRoute.params.subscribe(async (params: any) => {
      let id: number = parseInt(params?.id);
      if (id) {
        let response = await this.OrdersService.getById(id);
        this.ruta = response?.id;
      }
    });
  }
  //ordenes con el mismo id retorna el mismo detalle
  async updateValues(pId: Number, pState: Number, pComment: String): Promise<void> {
    $('#modalSpinner').modal('show');
    let order: any = {
      stateId: pState,
    };

    try {
      let response = await this.OrdersService.updateState(pId, order);
      if (pComment) {
        response = await this.OrdersService.updateComment(pId, pComment);
      }
      let tempArray = this.orders.filter((o => o.id !== pId));
      this.orders = tempArray;
    } catch (error) {
      console.log(error);
    }
    $('#modalSpinner').modal('hide');
  }

  capturar() {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.verSeleccion = this.opcionSeleccionado;
    if (this.verSeleccion == 'For Deliver') {
      this.ids = 4;
    } else if (this.verSeleccion == 'Returned') {
      this.ids = 3;
    } else if (this.verSeleccion == 'Deliver') {
      this.ids = 6;
    } else if (
      this.verSeleccion == '0' ||
      this.verSeleccion == '' ||
      this.verSeleccion == null ||
      this.verSeleccion == undefined
    ) {
      this.ids = 0;
    }
  }
}
