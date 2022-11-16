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
import { OrdersListComponent } from './components/home-operario/orders-list/orders-list.component';
import { OrderFormComponent } from './components/home-operario/order-form/order-form.component';
import { OrderViewComponent } from './components/home-operario/order-view/order-view.component';
import { HeaderComponent } from './components/home-operario/header/header.component';
import { OrderCardComponent } from './components/home-operario/order-card/order-card.component';
import { PopupComponent } from './components/home-operario/popup/popup.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeOperarioComponent,
    HomeEncargadoComponent,
    HomeJefeComponent,
    OrdersListComponent,
    OrderFormComponent,
    OrderViewComponent,
    HeaderComponent,
    OrderCardComponent,
    PopupComponent
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
