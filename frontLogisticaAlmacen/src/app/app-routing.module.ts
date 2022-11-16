import { formatCurrency } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormWarehousesComponent } from './components/form-warehouses/form-warehouses.component';
import { FormComponent } from './components/formEmployee/form.component';
import { HomeEncargadoComponent } from './components/home-encargado/home-encargado.component';
import { HomeJefeComponent } from './components/home-jefe/home-jefe.component';
import { HomeOperarioComponent } from './components/home-operario/home-operario.component';
import { LoginComponent } from './components/login/login.component';
import { ViewEmployeeComponent } from './components/view-employee/view-employee.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login" },
  { path: "login", component: LoginComponent },
  { path: "home-operario", component: HomeOperarioComponent },
  { path: "home-jefe", component: HomeJefeComponent },
  { path: "newEmployee", component: FormComponent },
  { path: "updateEmployee/:idemployee", component: FormComponent },
  { path: "viewEmployee", component: ViewEmployeeComponent },
  { path: "newWerehouse", component: FormWarehousesComponent},
  { path: "home-encargado", component: HomeEncargadoComponent },
  { path: "**", redirectTo: "login" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
