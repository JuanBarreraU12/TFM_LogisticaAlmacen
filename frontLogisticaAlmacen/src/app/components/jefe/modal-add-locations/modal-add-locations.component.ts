import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from 'src/app/interfaces/location.interface';
import { LocationsService } from 'src/app/services/locations.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-modal-add-locations',
  templateUrl: './modal-add-locations.component.html',
  styleUrls: ['./modal-add-locations.component.css']
})
export class ModalAddLocationsComponent implements OnInit {
  @Input() warehouseId: number = 0;
  userForm: FormGroup;

  constructor(private activateRoute: ActivatedRoute,
    private locationService: LocationsService,
    private router: Router) {
    this.userForm = new FormGroup({
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ])
  }, []) }

  ngOnInit(): void {


  }

  async getDataForm(): Promise<void>{
    if (this.userForm.valid) {}
    else {
      Swal.fire(
      'Informacion!',
      'El formulario no esta bien relleno',
      'info');
    }
    let data = this.userForm.value;
    const request={
      "description" : data.description,
      "warehouses_id" : this.warehouseId
    };
    let location = await this.locationService.create(request);
    if (location) {
      Swal.fire(
        'OK!',
        'Location created',
        'success')
        .then((result) => {
          window.location.reload();
      })
    }
    else {
      Swal.fire(
        'Error!',
        'Hubo un error',
        'error')
        .then((result) => {
          window.location.reload();
      });
    }
  }

  checkControl(pControlWarehouse: string, pError: string): boolean{
    if (this.userForm.get(pControlWarehouse)?.hasError(pError) && this.userForm.get(pControlWarehouse)?.touched) {
      return true;
    }
    else {
      return false;
    }
  }



}
