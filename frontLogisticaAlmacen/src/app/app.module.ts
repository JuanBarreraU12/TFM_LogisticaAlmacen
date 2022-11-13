import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeOperarioComponent } from './components/home-operario/home-operario.component';
import { HomeEncargadoComponent } from './components/home-encargado/home-encargado.component';
import { HomeJefeComponent } from './components/home-jefe/home-jefe.component';
import { FormComponent } from './components/formEmployee/form.component';
import { HeaderComponent } from './components/header/header.component';
import { FormWarehousesComponent } from './components/form-warehouses/form-warehouses.component';
import { ViewEmployeeComponent } from './components/view-employee/view-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeOperarioComponent,
    HomeEncargadoComponent,
    HomeJefeComponent,
    FormComponent,
    HeaderComponent,
    FormWarehousesComponent,
    ViewEmployeeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
