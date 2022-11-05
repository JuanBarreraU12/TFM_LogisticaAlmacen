import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private usersService: UsersService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  async getLogin(pForm: any): Promise<void> {

    let response = await this.usersService.login(pForm.value);
    console.log(response);
    if(response.fatal){
      Swal.fire(response.fatal, '', 'error');
    }
    else{
      switch(response.rol.description)
      {
        case "Operador":
          Swal.fire("Hola Operador", '', 'success');
          break;
        case "Jefe":
            Swal.fire("Hola Jefe", '', 'success');
            break;
        case "Encargado":
              Swal.fire("Hola Encargado", '', 'success');
              break;
        default:
          Swal.fire("Rol no encontrado", '', 'error');
          break;
      }
      localStorage.setItem('user', response);
      this.router.navigate(['/home'])
    }
  }

}
