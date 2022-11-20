import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/app/helpers/utils';
import { Login } from 'src/app/interfaces/login.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user = {} as Login;
  constructor() { }

  ngOnInit(): void {
    this.user = Utils.getSession();
  }

}
