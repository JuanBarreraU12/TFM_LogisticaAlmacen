import { Component, OnInit,Input, Output  } from '@angular/core';
import { Location } from 'src/app/interfaces/location.interface';
import { LocationsService } from 'src/app/services/locations.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-view-locations',
  templateUrl: './modal-view-locations.component.html',
  styleUrls: ['./modal-view-locations.component.css']
})
export class ModalViewLocationsComponent implements OnInit {
  @Input() arrLocations: Location[] = [];

  constructor(private locationService : LocationsService) { }

  ngOnInit(): void {
  }

  deleteLocation(locationId: number | undefined, warehouseId: number | undefined): void {
    Swal.fire({
      title: "Do you want to remove this location?",
      showDenyButton: true,
      confirmButtonText: 'YES',
      denyButtonText: 'NO',
    }).then((result) => {
      if (result.isConfirmed) {
        if (locationId !== undefined) {
          this.locationService.delete(locationId).then(async (response) => {
            if (response != null) {
              Swal.fire(
              'OK!',
              'location removed',
              'success');
              if(warehouseId)
                this.arrLocations = await this.locationService.getLocationByWarehouseId(warehouseId);
            }
          })
          .catch(err=>(err))
        }
      }
    })
  }
}
