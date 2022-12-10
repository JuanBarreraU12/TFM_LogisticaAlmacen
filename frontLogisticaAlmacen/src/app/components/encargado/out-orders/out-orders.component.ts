import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { UsersWarehousesService } from 'src/app/services/users-warehouses.service';
import { User } from 'src/app/interfaces/user.interface';
import { Util } from 'src/app/classes/util';

@Component({
  selector: 'app-out-orders',
  templateUrl: './out-orders.component.html',
  styleUrls: ['./out-orders.component.css']
})
export class OutOrdersComponent implements OnInit {
  user: User | any;
  logedUser: any ;
 warehouseid: any;
 warehouseOut: any;
  constructor(
    private usersService: UsersService,
    private usersWarehousesService: UsersWarehousesService,
  
  ) { }

  ngOnInit(): void {
    let userSession = Util.getUserSession();
    if (userSession) {
      try {
        this.user = this.usersService.getById(userSession.user_id);
        this.logedUser = userSession.user_id;
      } catch (error) {
        console.log(error);
      }
    }

    this.usersWarehousesService.getByUserId(this.logedUser).then((response) => {
      this.warehouseid = response[0].warehouses_id;
      this.warehouseOut = response[0].description;
      //console.log(this.warehouseOut);

    });
  }

}
