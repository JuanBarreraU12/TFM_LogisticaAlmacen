import { Component, OnInit, Input } from '@angular/core';
import { OrdersService } from '../../../services/orders.service';
import { OrdersDetailsService } from 'src/app/services/orders-details.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-ordes',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css'],
})
export class ListOrdersComponent implements OnInit {
  orderdata: any = [];
  orderdetails: any = [];
  ruta: any = [];

  optionsin: any = [];
  optionsout: any = [];
  comment: String = '';

  opcionSeleccionado: string = '0';
  verSeleccion: string = '';
  ids: number = 0;

  public p!: number;
  filterOrder = '';
  @Input() entrada: string = '';
  @Input() salida: string = '';
  @Input() idOrder: number = 0;

  constructor(
    private OrdersService: OrdersService,
    private OrdersDetailsService: OrdersDetailsService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {
    this.optionsout = ['For Deliver', 'Returned'];
    this.optionsin = ['Deliver'];

    this.OrdersService.getOrders().subscribe((orders) => {
      this.orderdata = orders;
    });
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
        //console.log(this.ruta);
      }
    });
  }
  //ordenes con el mismo id retorna el mismo detalle
  updateState(pId: Number, pState: Number) {
    let order: any = {
      stateId: pState
    }
    this.OrdersService.updateState(pId, order)
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateComment(pId: Number, pComment: String){
    this.OrdersService.updateComment(pId, pComment).then((response) => {
    }).catch((error) => {
      console.log(error);
    }
    );
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
    }
  }
}
