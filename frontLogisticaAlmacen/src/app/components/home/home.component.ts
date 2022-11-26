import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/interfaces/login.interface';
import { Utils } from 'src/app/helpers/utils'
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  user = {} as Login;
  constructor() {
  }

  ngOnInit(): void {
    this.user = Utils.getSession();
  }

}
