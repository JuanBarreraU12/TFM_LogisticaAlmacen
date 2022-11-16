import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
urlOrders: string = "http://localhost:3000/api/orders/"
constructor(private httClient: HttpClient) { }


getOrders(){
  return this.httClient.get(this.urlOrders);
}


}
