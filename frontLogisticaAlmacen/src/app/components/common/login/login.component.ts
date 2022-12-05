import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
  }

  async getLogin(pForm: any): Promise<void> {
    try {
      let response = await this.usersService.login(pForm.value);
      if (response.success) {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
        Swal.fire({
          title: 'Welcome',
          icon: 'success',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#6c757d', 
          heightAuto: false
        });
      }
    } catch (err: any) {
      if (err.status === 401) {
        Swal.fire(err.error.error, '', 'error');
      }
    }
  }
}
