import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocationsService } from 'src/app/services/locations.service';
declare var $: any;

@Component({
  selector: 'app-modal-add-locations',
  templateUrl: './modal-add-locations.component.html',
  styleUrls: ['./modal-add-locations.component.css'],
})
export class ModalAddLocationsComponent implements OnInit {
  @Input() warehouseId: number = 0;
  userForm: FormGroup;

  constructor(private locationService: LocationsService) {
    this.userForm = new FormGroup(
      {
        description: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ]),
      },
      []
    );
  }

  ngOnInit(): void {}

  async getDataForm(): Promise<void> {
    let data = this.userForm.value;
    const request = {
      description: data.description,
      warehouses_id: this.warehouseId,
    };
    let location = await this.locationService.create(request);
    if (location) $('.modal').modal('hide');
    this.userForm.reset();
  }

  checkControl(pControlWarehouse: string, pError: string): boolean {
    if (
      this.userForm.get(pControlWarehouse)?.hasError(pError) &&
      this.userForm.get(pControlWarehouse)?.touched
    ) {
      return true;
    } else {
      return false;
    }
  }
}
