import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/interfaces/employee.interface';
import { EmployeeService } from 'src/app/services/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {

  arrEmployee: Employee[] = [];
  constructor(
    private employeService: EmployeeService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getEmployee()
  }

async getEmployee(): Promise<void> {
    try {
      let response = await this.employeService.getAll()
      this.arrEmployee = response
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }

  deleteEmployee(pEmployee: number | undefined): void {
    Swal.fire({
      title: "Deseas borrar al Employee",
      showDenyButton: true,
      confirmButtonText: 'Aceptar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        if (pEmployee !== undefined) {
          this.employeService.delete(pEmployee).then(response => {
            if (response != null) {
              Swal.fire(
              'OK!',
              'Usuario borrado',
              'success')
              this.getEmployee()
            }
          })
          .catch(err=>(err))
        }
      }
    })
  }

}
