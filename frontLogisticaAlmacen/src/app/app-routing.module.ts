import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormWarehousesComponent } from './components/jefe/form-warehouses/form-warehouses.component';
import { UserFormComponent } from './components/jefe/user-form/user-form.component';
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
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      // JEFE
      {
        path: 'newuser',
        component: UserFormComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: 'Jefe' },
      },
      {
        path: 'newarehouse',
        component: FormWarehousesComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: 'Jefe' },
      },
      {
        path: 'userslist',
        component: ViewEmployeeComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: 'Jefe' },
      },
      {
        path: 'updateuser/:userId',
        component: UserFormComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: 'Jefe' },
      },
      {
        path: 'updatewarehouse/:warehouseId',
        component: FormWarehousesComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: 'Jefe' },
      },
      {
        path: 'user/:userId/warehouses',
        component: ListEmployeeWarehouseComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: 'Jefe' },
      },
      {
        path: 'warehouseslist',
        component: ViewWarehouseComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: 'Jefe' },
      },
      //OPERARIO
      {
        path: 'neworder',
        component: OrderFormComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: 'Operario' },
      },
      {
        path: 'updateorder/:orderId',
        component: OrderFormComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: 'Operario' },
      },
      {
        path: 'order/:orderId',
        component: OrderViewComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: 'Operario' },
      },
      {
        path: 'orderlist',
        component: OrdersListComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: 'Operario' },
      },
      //ENCARGADO
      {
        path: 'out-orders',
        component: OutOrdersComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: 'Encargado' },
      },
      {
        path: 'out-orders/:id',
        component: OutOrdersComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: 'Encargado' },
      },
      {
        path: 'in-orders',
        component: InOrdersComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: 'Encargado' },
      },
      {
        path: 'in-orders/:id',
        component: InOrdersComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: 'Encargado' },
      },
    ],
  },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
