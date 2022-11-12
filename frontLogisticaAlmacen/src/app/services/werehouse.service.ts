import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WerehouseService {

  urlWerehouse: string = "http://localhost:3000/api/warehouses/"
  constructor(private httClient: HttpClient) { }

  getAllWerehouse(): Promise<any> {
    return lastValueFrom(this.httClient.get<any>(`${this.urlWerehouse}`))
  }
}
