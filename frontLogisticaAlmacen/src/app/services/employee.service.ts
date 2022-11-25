import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Employee } from '../interfaces/employee.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  urlEmployee: string = "http://localhost:3000/api/employees/"
  registerUrl: string = "http://localhost:3000/api/users/register/"
  constructor(private httpClient: HttpClient) { }

  getAll(): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.urlEmployee}`))
  }

  getById (pId: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<Employee | any>(`${this.urlEmployee}${pId}`))
  }
  register(pEmployee: Employee): Promise<Employee> {
    return lastValueFrom(this.httpClient.post<Employee>(this.registerUrl, pEmployee))
  }

  create(pEmployee: Employee) : Promise<Employee> {
    return lastValueFrom(this.httpClient.post<Employee>(this.urlEmployee, pEmployee))
  }

  update(pEmployee: Employee): Promise<any> {
    return lastValueFrom(this.httpClient.put<any>(`${this.urlEmployee}${pEmployee.id}`, pEmployee))
  }

  delete(pEmployee: Number): Promise<any>{
    return lastValueFrom(this.httpClient.delete<any>(`${this.urlEmployee}${pEmployee}`));
  }
  
}
