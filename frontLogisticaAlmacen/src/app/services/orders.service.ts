import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Util } from '../classes/util';
import { Order } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  baseUrl: string = "http://localhost:3000/api/orders/"

constructor(private httpClient: HttpClient) { }

  getOrders(){
    return this.httpClient.get(this.baseUrl, Util.getHttpOptions());
  }
  getAll(): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}`, Util.getHttpOptions()));
  }

  getById(pId: Number): Promise<any>{
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}${pId}`, Util.getHttpOptions()));
  }

  create(pOrder: Order): Promise<any>{
    return lastValueFrom(this.httpClient.post<any>(`${this.baseUrl}`, pOrder, Util.getHttpOptions()));
  }

  update(pId: Number, pOrder: Order): Promise<any>{
    return lastValueFrom(this.httpClient.put<any>(`${this.baseUrl}${pId}`, pOrder, Util.getHttpOptions()));
  }

  updateState(pId: Number, pOrder: any): Promise<any>{
    return lastValueFrom(this.httpClient.patch<any>(`${this.baseUrl}${pId}`, pOrder, Util.getHttpOptions()));
  }

  delete(pId: Number): Promise<any>{
    return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}${pId}`, Util.getHttpOptions()));
  }
}
