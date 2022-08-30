import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';

import { HomeRoutingModule } from './home-routing.module';
import { HomeDashboardComponent } from '../components/home-dashboard/home-dashboard.component';
import { HeaderComponent } from '../components/header/header.component';
import { MainComponent } from '../components/main/main.component';

@NgModule({
  declarations: [HomeDashboardComponent, HeaderComponent, MainComponent],
  imports: [CommonModule, HomeRoutingModule, DragDropModule, MatIconModule],
})
export class HomeModule {}
