import { ElementSchemaRegistry } from '@angular/compiler';
import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-home-encargado',
  templateUrl: './home-encargado.component.html',
  styleUrls: ['./home-encargado.component.css']
})
export class HomeEncargadoComponent implements OnInit {

 // variable que guarda el id del rol
  rol: any;
  @Input() user: any[] = [];
  
 
  constructor(
  
    private activateRoute: ActivatedRoute,
    private router:Router,
    private usersService: UsersService

  ) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
    this.rol = this.activateRoute.snapshot.paramMap.get('id');
    
    let response = this.usersService.getEmployee(this.rol);
    
  
    
    });


}


  

 
}
