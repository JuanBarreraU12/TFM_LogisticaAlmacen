import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Warehouse } from '../interfaces/warehouse.interface';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  urlWarehouse: string = "http://localhost:3000/api/warehouses/"
  constructor(private httClient: HttpClient) { }

  getAllWarehouse(): Promise<any> {
    return lastValueFrom(this.httClient.get<any>(`${this.urlWarehouse}`))
  }

  update(pwarehouse: Warehouse): Promise<any> {
    return lastValueFrom(this.httClient.put<any>(`${this.urlWarehouse}${pwarehouse.id}`, pwarehouse))
  }

  getById(pId: number): Promise<any> {
    return lastValueFrom(this.httClient.get<Warehouse | any> (`${this.urlWarehouse}${pId}`))
  }

  create(pWarehouse: Warehouse): Promise<Warehouse> {
    return lastValueFrom(this.httClient.post<Warehouse>(this.urlWarehouse, pWarehouse))
  }
}
