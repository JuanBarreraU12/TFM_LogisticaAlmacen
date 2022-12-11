import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/common/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from './components/jefe/user-form/user-form.component';
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
import { ListEmployeeWarehouseComponent } from './components/jefe/list-employee-warehouse/list-employee-warehouse.component';
import { ModalViewLocationsComponent } from './components/jefe/modal-view-locations/modal-view-locations.component';
import { ModalAddLocationsComponent } from './components/jefe/modal-add-locations/modal-add-locations.component';
import { RecuperarPasswordComponent } from './components/jefe/recuperar-password/recuperar-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserFormComponent,
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
    ListEmployeeWarehouseComponent,
    ModalViewLocationsComponent,
    ModalAddLocationsComponent,
    RecuperarPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
