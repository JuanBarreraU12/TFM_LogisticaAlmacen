import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Util } from 'src/app/classes/util';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  userSession: any;
  role: string = '';
  collapse: boolean = true;
  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    let userSession = Util.getUserSession();
    if (userSession) this.role = userSession.user_role;
  }

  cambio() {
    if (this.collapse) this.collapse = false;
    else this.collapse = true;
  }
}
