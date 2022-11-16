import { Component, Input, OnInit, Output } from '@angular/core';
import { MaterialLocation } from 'src/app/interfaces/material-location';
import { OrderDetail } from 'src/app/interfaces/order-detail.interface';
import { Order } from 'src/app/interfaces/order.interface';
import { MaterialsLocationsService } from 'src/app/services/materials-locations.service';
import { OrdersDetailsService } from 'src/app/services/orders-details.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent implements OnInit {
  availableMaterials: MaterialLocation[] = [];
  materialsLocations: MaterialLocation[] = [];
  newOrderDetails: OrderDetail[] = [];

  @Input() order: Order | any;
  @Input() orderDetails: OrderDetail[] = [];
  constructor(
    private materialsLocationsService: MaterialsLocationsService,
    private ordersDetailsService: OrdersDetailsService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      this.materialsLocations = await this.materialsLocationsService.getAll(
        this.order.originId
      );
    } catch (error: any) {
      error.error.forEach((err: any) => {
        Swal.fire(err.error, '', 'error');
      });
    }

    this.loadAvailableMaterials();
  }

  ngOnChanges(): void {
    this.loadAvailableMaterials();
  }

  materialSelected(event: any): void {
    const control = event.target;
    let id = parseInt(control.dataset.materialSelected);

    if (control.checked) {
      let newOrderDetail: OrderDetail = {
        materialLocationId: id,
        quantity: 0,
      };
      this.newOrderDetails.push(newOrderDetail);
    } else {
      let tempArray = this.newOrderDetails.filter(
        (od) => od.materialLocationId !== id
      );
      this.newOrderDetails = tempArray;
    }
  }

  saveDetails(): void {
    this.newOrderDetails.forEach(async (newOrderDetail) => {
      try {
        let orderDetailAdded = await this.ordersDetailsService.create(
          this.order.id,
          newOrderDetail
        );
        if (orderDetailAdded.id) {
          this.orderDetails.push(orderDetailAdded);
          let tempArray = this.availableMaterials.filter(
            (am) => am.id !== newOrderDetail.materialLocationId
          );
          this.availableMaterials = tempArray;
          this.newOrderDetails = [];
        }
      } catch (error: any) {
        // Swal.fire(error.message, '', 'error');
        console.log(error);
      }
    });
  }

  loadAvailableMaterials(): void {
    this.availableMaterials = [];
    this.materialsLocations.forEach((ml) => {
      let same = false;
      this.orderDetails.forEach((od) => {
        if (ml.id === od.materialLocationId) same = true;
      });
      if (!same) this.availableMaterials.push(ml);
    });
  }
}
