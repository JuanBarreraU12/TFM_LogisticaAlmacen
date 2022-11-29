import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Order } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  baseUrl: string = "http://localhost:3000/api/orders/"
  URL2 = 'http://localhost:3000/api/orders/';

constructor(private httpClient: HttpClient) { }

  getOrders(){
    return this.httpClient.get(this.baseUrl);
  }
  getAll(): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}`));
  }

  getById(pId: Number): Promise<any>{
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}${pId}`));
  }

  create(pOrder: Order): Promise<any>{
    return lastValueFrom(this.httpClient.post<any>(`${this.baseUrl}`, pOrder));
  }

  update(pId: Number, pOrder: Order): Promise<any>{
    return lastValueFrom(this.httpClient.put<any>(`${this.baseUrl}${pId}`, pOrder));
  }

  updateState(pId: Number, pOrder: any): Promise<any>{
    return lastValueFrom(this.httpClient.patch<any>(`${this.baseUrl}${pId}`, pOrder));
  }

  delete(pId: Number): Promise<any>{
    return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}${pId}`));
  }
}
