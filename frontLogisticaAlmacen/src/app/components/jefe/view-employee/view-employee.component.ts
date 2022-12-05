import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css'],
})
export class ViewEmployeeComponent implements OnInit {
  arrUsers: User[] = [];
  constructor(private usersService: UsersService) {}

  async ngOnInit(): Promise<void> {
    try {
      let response = await this.usersService.getAll();
      this.arrUsers = response;
    } catch (err) {
      console.log(err);
    }
  }

  deleteEmployee(pEmployee: number | any): void {
    Swal.fire({
      title: `Do you want to delete the user #${pEmployee}?`,
      text: 'This action is irreversible!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#6c757d',
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Delete',
      heightAuto: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          if (pEmployee) {
            let response = await this.usersService.deleteById(pEmployee);
            if (response.affectedRows > 0) {
              Swal.fire({
                title: 'Deleted!',
                text: `The user #${pEmployee} was deleted`,
                icon: 'success',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#6c757d',
                heightAuto: false,
              });
              this.ngOnInit();
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  }
}
