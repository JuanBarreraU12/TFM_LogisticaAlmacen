import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Util } from '../classes/util';
import { Warehouse } from '../interfaces/warehouse.interface';

@Injectable({
  providedIn: 'root',
})
export class WarehousesService {
  baseUrl: string = 'http://localhost:3000/api/warehouses/';
  constructor(private httClient: HttpClient) {}

  getAll(): Promise<any> {
    return lastValueFrom(this.httClient.get<any>(`${this.baseUrl}`, Util.getHttpOptions()));
  }

  update(pId: number, pWarehouse: Warehouse): Promise<any> {
    return lastValueFrom(
      this.httClient.put<any>(`${this.baseUrl}${pId}`, pWarehouse, Util.getHttpOptions())
    );
  }

  getById(pId: number): Promise<any> {
    return lastValueFrom(this.httClient.get<any>(`${this.baseUrl}${pId}`, Util.getHttpOptions()));
  }

  create(pWarehouse: Warehouse): Promise<any> {
    return lastValueFrom(this.httClient.post<any>(this.baseUrl, pWarehouse, Util.getHttpOptions()));
  }

  delete(pId: Number): Promise<any> {
    return lastValueFrom(this.httClient.delete<any>(`${this.baseUrl}${pId}`, Util.getHttpOptions()));
  }

  getByUser(pUserId: Number): Promise<any> {
    return lastValueFrom(
      this.httClient.get<any>(`${this.baseUrl}users/${pUserId}`, Util.getHttpOptions())
    );
  }
}
