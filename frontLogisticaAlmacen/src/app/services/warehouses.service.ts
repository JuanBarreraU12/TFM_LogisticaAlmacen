import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Warehouse } from '../interfaces/warehouse.interface';

@Injectable({
  providedIn: 'root'
})
export class WarehousesService {

  baseUrl: String = 'http://localhost:3000/api/warehouses/'
  constructor(private httpClient: HttpClient) { }

  getAll(): Promise<Warehouse[]>{
    return lastValueFrom(this.httpClient.get<Warehouse[]>(`${this.baseUrl}`));
  }
}
