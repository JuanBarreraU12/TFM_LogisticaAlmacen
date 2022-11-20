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
import { ListOrdesComponent } from './components/list-ordes/list-ordes.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { HeadComponent } from './components/head/head.component';
import { FooterComponent } from './components/footer/footer.component';
import { ViewWarehouseComponent } from './components/view-warehouse/view-warehouse.component';

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
    ListOrdesComponent,
    HomeComponent,
    MenuComponent,
    HeadComponent,
    FooterComponent,
    ViewWarehouseComponent,
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
