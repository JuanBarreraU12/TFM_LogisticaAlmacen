import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Location } from '../interfaces/location.interface';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  urlLocation: string = "http://localhost:3000/api/locations"
  urlLocationWarehouse: string = "http://localhost:3000/api/locations/warehouse/"

  constructor(private httpClient: HttpClient) { }

  getAll(): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.urlLocation}`))
  }

  getById(pId: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<Location | any> (`${this.urlLocation}${pId}`))
  }

  getLocationByWarehouseId(pId: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<Location | any> (`${this.urlLocationWarehouse}${pId}`))
  }

  create(pLocation: Location): Promise<Location> {
    return lastValueFrom(this.httpClient.post<Location>(this.urlLocation, pLocation))
  }

  update(pLocation: Location): Promise<any> {
    return lastValueFrom(this.httpClient.put<any>(`${this.urlLocation}${pLocation.id}`, pLocation))
  }

  delete(pLocation: Number): Promise<any> {
    return lastValueFrom(this.httpClient.delete<any>(`${this.urlLocation}${pLocation}`))
  }

}
