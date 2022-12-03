import { Component, OnInit,Input, Output  } from '@angular/core';
import { Location } from 'src/app/interfaces/location.interface';

@Component({
  selector: 'app-modal-view-locations',
  templateUrl: './modal-view-locations.component.html',
  styleUrls: ['./modal-view-locations.component.css']
})
export class ModalViewLocationsComponent implements OnInit {
  @Input() arrLocations: Location[] = [];

  constructor() { }

  ngOnInit(): void {
  }
}
