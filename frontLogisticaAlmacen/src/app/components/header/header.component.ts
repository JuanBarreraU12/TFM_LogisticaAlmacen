import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utils } from 'src/app/helpers/utils';
import { Login } from 'src/app/interfaces/login.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user = {} as Login;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.user = Utils.getSession();
  }
  open(){
    const box =  document.body.classList.contains('toggle-sidebar');
    if (!box) {
      document.body.classList.add('toggle-sidebar');
    }
    else  {
      document.body.classList.remove('toggle-sidebar');
    }
  }
  exit(){
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

}
