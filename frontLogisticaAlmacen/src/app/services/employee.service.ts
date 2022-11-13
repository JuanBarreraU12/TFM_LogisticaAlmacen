import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  urlEmployee: string = "http://localhost:3000/api/employees"
  constructor(private httpClient: HttpClient) { }

  getById (pId: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.urlEmployee}${pId}`))
  }

  create(pUser: User) : Promise<User> {
    return lastValueFrom(this.httpClient.post<User>(this.urlEmployee, pUser))
  }

  update(pUser: User): Promise<any> {
    return lastValueFrom(this.httpClient.put<any>(`${this.urlEmployee}${pUser.id}`, pUser))
  }
  
}
