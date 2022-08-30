import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeDashboardComponent } from '../components/home-dashboard/home-dashboard.component';
import { HeaderComponent } from '../components/header/header.component';
import { MainComponent } from '../components/main/main.component';
import { DialogComponent } from '../components/dialog/dialog.component';
import { AddcardDialogComponent } from '../components/addcard-dialog/addcard-dialog.component';

@NgModule({
  declarations: [
    HomeDashboardComponent,
    HeaderComponent,
    MainComponent,
    DialogComponent,
    AddcardDialogComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    DragDropModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    FormsModule,
  ],
  bootstrap: [DialogComponent, AddcardDialogComponent],
})
export class HomeModule {}
