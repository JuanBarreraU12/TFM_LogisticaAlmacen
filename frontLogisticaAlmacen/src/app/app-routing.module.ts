import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormWarehousesComponent } from './components/jefe/form-warehouses/form-warehouses.component';
import { FormEmployeeComponent } from './components/jefe/form-employee/form-employee.component';
import { OrderFormComponent } from './components/operario/order-form/order-form.component';
import { OrderViewComponent } from './components/operario/order-view/order-view.component';
import { OrdersListComponent } from './components/operario/orders-list/orders-list.component';
import { LoginComponent } from './components/common/login/login.component';
import { ViewEmployeeComponent } from './components/jefe/view-employee/view-employee.component';
import { HomeComponent } from './components/common/home/home.component';
import { ViewWarehouseComponent } from './components/jefe/view-warehouse/view-warehouse.component';
import { OutOrdersComponent } from './components/encargado/out-orders/out-orders.component';
import { PopupComponent } from './components/operario/popup/popup.component';
import { InOrdersComponent } from './components/encargado/in-orders/in-orders.component';
import { ListEmployeeWarehouseComponent } from './components/jefe/list-employee-warehouse/list-employee-warehouse.component';
import { ViewLocationComponent } from './components/jefe/view-location/view-location.component';
import { FormLocationComponent } from './components/jefe/form-location/form-location.component';
import { RecuperarPasswordComponent } from './components/jefe/recuperar-password/recuperar-password.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'newPassword', component: RecuperarPasswordComponent }, 
  

  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'newEmployee', component: FormEmployeeComponent },
      { path: 'newWerehouse', component: FormWarehousesComponent },
      { path: 'viewEmployee', component: ViewEmployeeComponent },
      { path: 'viewLocation', component: ViewLocationComponent },
      { path: 'newLocation', component: FormLocationComponent },
      { path: 'updateEmployee/:idemployee', component: FormEmployeeComponent },
      { path: 'updateWarehouse/:idwarehouse', component: FormWarehousesComponent },
      { path: 'listEmployeeWarehouse/:idemployee', component: ListEmployeeWarehouseComponent },
      //OPERARIO
      { path: 'neworder', component: OrderFormComponent },
      { path: 'updateorder/:orderId', component: OrderFormComponent },
      { path: 'order/:orderId', component: OrderViewComponent },
      { path: 'orderlist', component: OrdersListComponent },
      { path: 'viewWarehouse', component: ViewWarehouseComponent },
      //ENCARGADO
      { path: 'out-orders', component: OutOrdersComponent },
      { path: 'out-orders/:id', component: OutOrdersComponent },
      { path: 'in-orders', component: InOrdersComponent },
      { path: 'in-orders/:id', component: InOrdersComponent },
      { path: 'pop-up', component: PopupComponent },
    ],
  },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
