import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MatterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { APIModule } from './services/service.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainModule } from './components/main/main.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorComponent } from './components/error/error.component';
import { UserComponent } from './components/user/user.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, ErrorComponent, UserComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatterialModule,
    CommonModule,
    APIModule,
    FormsModule,
    ReactiveFormsModule,
    MainModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
