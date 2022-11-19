import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/app/helpers/utils';
import { Login } from 'src/app/interfaces/login.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  user = {} as Login;
  jefe : boolean = false;
  operario : boolean = false;
  encargado : boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.user = Utils.getSession();
    this.setRol();
  }

  setRol(){
    if(this.user.rol.name="Jefe")
      this.jefe=true;
    else if (this.user.rol.name="Operario")
      this.operario=true;
    else if (this.user.rol.name="Encargado")
      this.encargado=true;
  }



}
