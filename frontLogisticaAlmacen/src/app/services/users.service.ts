import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Util } from '../classes/util';
import { User } from '../interfaces/user.interface';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseUrl: string = 'http://localhost:3000/api/users/';
  constructor(private httpClient: HttpClient) {
  }

  login(pFormValue: any): Promise<any> {
    return lastValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}login`, pFormValue)
    );
  }

  register(pUser: User): Promise<any> {
    return lastValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}register`, pUser, Util.getHttpOptions())
    );
  }
  changepassword(pUser: any): Promise<any> {
    return lastValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}changepassword`, pUser, Util.getHttpOptions())
    );
  }

  getAll(): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(this.baseUrl, Util.getHttpOptions()));
  }

  getById(pId: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}${pId}`, Util.getHttpOptions()));
  }

  update(pId: number, pUser: User): Promise<any> {
    return lastValueFrom(
      this.httpClient.put<any>(`${this.baseUrl}${pId}`, pUser, Util.getHttpOptions())
    );
  }

  deleteById(pId: number): Promise<any> {
    return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}${pId}`, Util.getHttpOptions()));
  }
}
