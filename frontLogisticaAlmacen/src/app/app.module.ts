import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/common/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormEmployeeComponent } from './components/jefe/form-employee/form-employee.component';
import { FormWarehousesComponent } from './components/jefe/form-warehouses/form-warehouses.component';
import { ViewEmployeeComponent } from './components/jefe/view-employee/view-employee.component';
import { ListOrdersComponent } from './components/encargado/list-orders/list-orders.component';
import { HomeComponent } from './components/common/home/home.component';
import { MenuComponent } from './components/common/menu/menu.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { OrdersListComponent } from './components/operario/orders-list/orders-list.component';
import { OrderFormComponent } from './components/operario/order-form/order-form.component';
import { OrderViewComponent } from './components/operario/order-view/order-view.component';
import { HeaderComponent } from './components/common/header/header.component';
import { OrderCardComponent } from './components/operario/order-card/order-card.component';
import { PopupComponent } from './components/operario/popup/popup.component';
import { ViewWarehouseComponent } from './components/jefe/view-warehouse/view-warehouse.component';
import { InOrdersComponent } from './components/encargado/in-orders/in-orders.component';
import { OutOrdersComponent } from './components/encargado/out-orders/out-orders.component';
import { FiltroPipe } from './pipes/filtro.pipe';
import { WarehousesUsersPipe } from './pipes/warehouses-users.pipe';
import { ListEmployeeWarehouseComponent } from './components/jefe/list-employee-warehouse/list-employee-warehouse.component';
import { FormLocationComponent } from './components/jefe/form-location/form-location.component';
import { ViewLocationComponent } from './components/jefe/view-location/view-location.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FormEmployeeComponent,
    FormWarehousesComponent,
    ViewEmployeeComponent,
    ListOrdersComponent,
    HomeComponent,
    MenuComponent,
    FooterComponent,
    OrdersListComponent,
    OrderFormComponent,
    OrderViewComponent,
    OrderCardComponent,
    PopupComponent,
    HeaderComponent,
    ViewWarehouseComponent,
    InOrdersComponent,
    OutOrdersComponent,
    FiltroPipe,
    WarehousesUsersPipe,
    ListEmployeeWarehouseComponent,
    FormLocationComponent,
    ViewLocationComponent
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
