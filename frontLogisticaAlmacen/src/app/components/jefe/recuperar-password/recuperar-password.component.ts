import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent implements OnInit {

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
  }
  async changePassword(pForm: any): Promise<void> {
    try {
      let response = await this.usersService.changepassword(pForm.value);
      if (response.affectedRows>0) {
        Swal.fire(
          'OK!',
          'The password has been changed',
          'success')
          .then((result) => {
            this.router.navigate(['/login'])
        });
      }
    } catch (err: any) {
      if (err.status === 401) {
        Swal.fire(err.error.error, '', 'error');
      }
    }
  }

}
