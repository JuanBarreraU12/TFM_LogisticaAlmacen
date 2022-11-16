import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl: string = "http://localhost:3000/api/users/login"
  userswerehouseUrl: string = "http://localhost:3000/api/users-warehouses/"
  constructor(private httpClient: HttpClient ) { }


  login(pFormValue: any): Promise<any> {
    console.log("-----");
    console.log(pFormValue);
    const httpOptions = {
      headers: new HttpHeaders({
      'Authorization': 'TOKEN',
      'Access-Control-Allow-Origin':"*",
      'Content-Type': 'application/json'
      })
      }
    return lastValueFrom(this.httpClient.post<any>(this.baseUrl, pFormValue,httpOptions));
  }

  

  userswerehouse(pUser: User): Promise<User> {
    return lastValueFrom(this.httpClient.post<User>(this.userswerehouseUrl, pUser))
  }

}
