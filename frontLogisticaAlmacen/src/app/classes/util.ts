import { HttpHeaders } from '@angular/common/http';
import jwt_decode from 'jwt-decode';

export class Util {
  static getHttpOptions(): any {
    const token = localStorage.getItem('token');
    let httpOptions;
    if (token) {
      httpOptions = {
        headers: new HttpHeaders({
          authorization: token,
        }),
      };
    }

    return httpOptions;
  }
  
  static getUserSession(): any {
    let usersSession;
    const token = localStorage.getItem('token');
    if (token) usersSession = jwt_decode(token);

    return usersSession;
  }
}
