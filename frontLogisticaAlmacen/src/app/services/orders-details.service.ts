import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Util } from '../classes/util';
import { OrderDetail } from '../interfaces/order-detail.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdersDetailsService {

  baseUrl: String = 'http://localhost:3000/api/orders-details/';
  constructor(private httpClient: HttpClient) { }

  getAll(pOrderId: Number): Promise<any>{
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}${pOrderId}`, Util.getHttpOptions()));
  }

  create(pOrderId: Number, pOrder: OrderDetail): Promise<any>{
    return lastValueFrom(this.httpClient.post<any>(`${this.baseUrl}${pOrderId}`, pOrder, Util.getHttpOptions()));
  }

  deleteById(pOrderId: Number, pOrderDetailId: Number): Promise<any>{
    return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}${pOrderId}/details/${pOrderDetailId}`, Util.getHttpOptions()));
  }

  update(pOrderId: Number, pOrderDetailId: Number, pOrder: OrderDetail): Promise<any>{
    return lastValueFrom(this.httpClient.put<any>(`${this.baseUrl}${pOrderId}/details/${pOrderDetailId}`, pOrder, Util.getHttpOptions()));
  }
}
