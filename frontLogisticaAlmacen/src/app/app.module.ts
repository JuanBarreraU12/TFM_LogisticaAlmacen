import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HomeOperarioComponent } from './components/home-operario/home-operario.component';
import { HomeEncargadoComponent } from './components/home-encargado/home-encargado.component';
import { HomeJefeComponent } from './components/home-jefe/home-jefe.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeOperarioComponent,
    HomeEncargadoComponent,
    HomeJefeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
