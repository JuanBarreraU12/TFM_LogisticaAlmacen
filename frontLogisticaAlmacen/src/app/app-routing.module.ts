import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeEncargadoComponent } from './components/home-encargado/home-encargado.component';
import { HomeJefeComponent } from './components/home-jefe/home-jefe.component';
import { HomeOperarioComponent } from './components/home-operario/home-operario.component';
import { OrderFormComponent } from './components/home-operario/order-form/order-form.component';
import { OrdersListComponent } from './components/home-operario/orders-list/orders-list.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home-operario',
    component: HomeOperarioComponent,
    children: [
      { path: 'home', component: OrdersListComponent },
      { path: 'neworder', component: OrderFormComponent },
      { path: 'updateorder/:orderId', component: OrderFormComponent }
    ],
  },
  { path: 'home-jefe', component: HomeJefeComponent },
  { path: 'home-encargado', component: HomeEncargadoComponent },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
