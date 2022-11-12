import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  urlRol: string = "http://localhost:3000/api/roles/"
  constructor(private httpClient: HttpClient) { }

  getAll(): Promise<any>{
    return lastValueFrom(this.httpClient.get<any>(`${this.urlRol}`))
  }
}
