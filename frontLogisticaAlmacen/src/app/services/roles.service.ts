import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Util } from '../classes/util';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  urlRol: string = "http://localhost:3000/api/roles/"
  constructor(private httpClient: HttpClient) { }

  getAll(): Promise<any>{
    return lastValueFrom(this.httpClient.get<any>(`${this.urlRol}`, Util.getHttpOptions()))
  }
}
