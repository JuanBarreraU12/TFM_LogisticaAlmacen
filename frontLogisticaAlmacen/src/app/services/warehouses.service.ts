import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Warehouse } from '../interfaces/warehouse.interface';
import { Util } from '../classes/util';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  urlWarehouse: string = "http://localhost:3000/api/warehouses/"
  urlWarehouseEmployee: string = "http://localhost:3000/api/warehouses/employee/"
  constructor(private httClient: HttpClient) { }

  getAllWarehouse(): Promise<any> {
    return lastValueFrom(this.httClient.get<any>(`${this.urlWarehouse}`, Util.getHttpOptions()))
  }

  update(pwarehouse: Warehouse): Promise<any> {
    return lastValueFrom(this.httClient.put<any>(`${this.urlWarehouse}`, pwarehouse, Util.getHttpOptions()))
  }

  getById(pId: number): Promise<any> {
    return lastValueFrom(this.httClient.get<Warehouse | any> (`${this.urlWarehouse}${pId}`, Util.getHttpOptions()))
  }

  create(pWarehouse: Warehouse): Promise<any> {
    return lastValueFrom(this.httClient.post<any>(this.urlWarehouse, pWarehouse, Util.getHttpOptions()));
  }

  delete(pWarehouse: Number): Promise<any> {
    return lastValueFrom(this.httClient.delete<any>(`${this.urlWarehouse}${pWarehouse}`, Util.getHttpOptions()));
  }

  getByUser(pUserId: Number): Promise<any> {
    return lastValueFrom(
      this.httClient.get<any>(`${this.urlWarehouse}users/${pUserId}`, Util.getHttpOptions())
    );
  }
}
