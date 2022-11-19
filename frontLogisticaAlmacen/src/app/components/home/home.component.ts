import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/interfaces/login.interface';
import { Utils } from 'src/app/helpers/utils'
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css',
  "../../../assets/vendor/bootstrap/css/bootstrap.min.css",
  "../../../assets/vendor/bootstrap-icons/bootstrap-icons.css",
  "../../../assets/vendor/boxicons/css/boxicons.min.css",
  "../../../assets/vendor/quill/quill.snow.css",
  "../../../assets/vendor/quill/quill.bubble.css",
  "../../../assets/vendor/remixicon/remixicon.css",
  "../../../assets/vendor/simple-datatables/style.css",
  "../../../assets/css/style.css"
]})

export class HomeComponent implements OnInit {

  user = {} as Login;
  constructor() {
  }

  ngOnInit(): void {
    this.user = Utils.getSession();
  }

}
