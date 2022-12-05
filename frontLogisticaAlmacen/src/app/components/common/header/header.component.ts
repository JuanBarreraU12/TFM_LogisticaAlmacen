import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import { Util } from 'src/app/classes/util';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user: User | any;
  constructor(private router: Router, private usersService: UsersService) {}

  async ngOnInit(): Promise<void> {
    let userSession = Util.getUserSession();
    if (userSession) {
      try {
        this.user = await this.usersService.getById(userSession.user_id);
      } catch (error) {
        console.log(error);
      }
    }
  }
  open() {
    const box = document.body.classList.contains('toggle-sidebar');
    if (!box) {
      document.body.classList.add('toggle-sidebar');
    } else {
      document.body.classList.remove('toggle-sidebar');
    }
  }
  exit() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
