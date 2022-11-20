import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeOperarioComponent } from './components/home-operario/home-operario.component';
import { HomeEncargadoComponent } from './components/home-encargado/home-encargado.component';
import { FormComponent } from './components/formEmployee/form.component';
import { FormWarehousesComponent } from './components/form-warehouses/form-warehouses.component';
import { ViewEmployeeComponent } from './components/view-employee/view-employee.component';
import { ListOrdesComponent } from './components/list-ordes/list-ordes.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { HeadComponent } from './components/head/head.component';
import { FooterComponent } from './components/footer/footer.component';
import { OrdersListComponent } from './components/home-operario/orders-list/orders-list.component';
import { OrderFormComponent } from './components/home-operario/order-form/order-form.component';
import { OrderViewComponent } from './components/home-operario/order-view/order-view.component';
import { HeaderComponent } from './components/header/header.component';
import { OrderCardComponent } from './components/home-operario/order-card/order-card.component';
import { PopupComponent } from './components/home-operario/popup/popup.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeOperarioComponent,
    HomeEncargadoComponent,
    FormComponent,
    FormWarehousesComponent,
    ViewEmployeeComponent,
    ListOrdesComponent,
    HomeComponent,
    MenuComponent,
    HeadComponent,
    FooterComponent,
    OrdersListComponent,
    OrderFormComponent,
    OrderViewComponent,
    OrderCardComponent,
    PopupComponent,
    HeaderComponent
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
