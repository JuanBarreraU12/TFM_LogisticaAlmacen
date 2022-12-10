import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from 'src/app/interfaces/location.interface';
import { LocationsService } from 'src/app/services/locations.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-location',
  templateUrl: './form-location.component.html',
  styleUrls: ['./form-location.component.css']
})
export class FormLocationComponent implements OnInit {

  userForm: FormGroup
  type: string = 'Nuevo';
  idLocation: number = 0;

  constructor(
    private locationService: LocationsService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.userForm = new FormGroup({

      description: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10)
      ])
      
    }, [])    
  }

  async getDataForm(): Promise<void> {
    if (this.userForm.valid) { }
    else {
      Swal.fire(
      'OK!',
      'El formulario no esta bien relleno',
      'info')
    }
    let newLocation = this.userForm.value;
    if (this.idLocation > 0) {

      let response = await this.locationService.update(newLocation);
      if (response.affectedRows>0) {
        Swal.fire(
          'OK!',
          'Locacion actualizada',
          'success')
          .then((result) => {
            this.router.navigate(['/home', 'viewLocation']);
        });
      }
      else {
        Swal.fire(
          'Error!',
          response.error,
          'error')
          .then((result) => {
            this.router.navigate(['/home','viewLocation']);
        });
      } 
    }
    else {
      let locationResponse = await this.locationService.create(newLocation);
      if (locationResponse.id) {
        Swal.fire(
        'OK!',
        'Almacen creado',
        'success')
        .then((result) => {
          this.router.navigate(['/home', 'viewLocation']);
        })
      }
      else {
        Swal.fire(
          'Error!',
          'There is an error',
          'error')
          .then((result) => {
            this.router.navigate(['/home', 'viewLocation']);
          });
      }
    }
  }
  
  ngOnInit(): void {
    this.activateRoute.params.subscribe(async (params: any) => {
      this.idLocation = params.idLocation;
      let id: number = parseInt(params.idLocation);
      if (id) {
        this.type = 'Update'
        const response = await this.locationService.getById(id)
        const location: Location = response;
        this.userForm = new FormGroup({
          description: new FormControl(location?.description, []),
          id: new FormControl(id, []),
        }, [])
      }
    })
  }

  checkControl(pControlLocation: string, pError: string): boolean {
    if (this.userForm.get(pControlLocation)?.hasError(pError) && this.userForm.get(pControlLocation)?.touched) {
      return true;
    }
    else {
      return false;
    }
  }

}
