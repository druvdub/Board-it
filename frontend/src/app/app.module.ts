import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { httpsInterceptorProvider } from './_helpers/http.interceptor';
import { HomeDashboardComponent } from './modules/components/home-dashboard/home-dashboard.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, SignupComponent, HomeDashboardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    CommonModule,
  ],
  providers: [httpsInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
