import { formatCurrency } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormWarehousesComponent } from './components/form-warehouses/form-warehouses.component';
import { FormComponent } from './components/formEmployee/form.component';
import { HomeEncargadoComponent } from './components/home-encargado/home-encargado.component';
import { OrderFormComponent } from './components/home-operario/order-form/order-form.component';
import { OrderViewComponent } from './components/home-operario/order-view/order-view.component';
import { OrdersListComponent } from './components/home-operario/orders-list/orders-list.component';
import { LoginComponent } from './components/login/login.component';
import { ViewEmployeeComponent } from './components/view-employee/view-employee.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login" },
  { path: "login", component: LoginComponent },
  { path: "home-encargado", component: HomeEncargadoComponent },
  { path: "home", component: HomeComponent, children:[
    { path: '', pathMatch: 'full', redirectTo: 'home'},
    { path: "newEmployee", component: FormComponent },
    { path: "newWerehouse", component: FormWarehousesComponent},
    { path: "viewEmployee", component: ViewEmployeeComponent },
    { path: "updateEmployee/:idemployee", component: FormComponent },
    { path: "updateWarehouse/:idwarehouse", component: FormWarehousesComponent },

    { path: 'neworder', component: OrderFormComponent },
    { path: 'updateorder/:orderId', component: OrderFormComponent },
    { path: 'order/:orderId', component: OrderViewComponent },
    { path: 'orderlist', component: OrdersListComponent },
    ]
  },
  { path: "**", redirectTo: "login" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
