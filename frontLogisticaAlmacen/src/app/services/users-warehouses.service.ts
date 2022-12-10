import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Util } from '../classes/util';
import { UserWarehouse } from '../interfaces/user-warehouse.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersWarehousesService {

  baseUrl: string = 'http://localhost:3000/api/users-warehouses/'
  constructor(private httpClient: HttpClient) { }

  create(pUserWarehouse: any): Promise<any> {
    return lastValueFrom(this.httpClient.post<any>(this.baseUrl, pUserWarehouse, Util.getHttpOptions()));
  }

  update(pUserWarehouse: any): Promise<any> {
    return lastValueFrom(this.httpClient.put<any>(this.baseUrl, pUserWarehouse, Util.getHttpOptions()));
  }

  delete(pId: number): Promise<any>{
    return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}${pId}`, Util.getHttpOptions()));
  }
}
