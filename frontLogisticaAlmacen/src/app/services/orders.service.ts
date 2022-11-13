import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Order } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  baseUrl: String = 'http://localhost:3000/api/orders/';
  constructor(private httpClient: HttpClient) { }
  
  getAll(): Promise<Order[] | any> {
    return lastValueFrom(this.httpClient.get<Order[] | any>(`${this.baseUrl}`));
  }

  getById(pId: Number): Promise<Order | any>{
    return lastValueFrom(this.httpClient.get<Order | any>(`${this.baseUrl}${pId}`));
  }

  create(pOrder: Order): Promise<Order | any>{
    return lastValueFrom(this.httpClient.post<Order | any>(`${this.baseUrl}`, pOrder));
  }
}
