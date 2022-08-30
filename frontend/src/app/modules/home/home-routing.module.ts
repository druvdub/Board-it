import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeDashboardComponent } from '../components/home-dashboard/home-dashboard.component';
import { MainComponent } from '../components/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: HomeDashboardComponent,
    children: [
      { path: 'board', component: MainComponent },
      { path: '', redirectTo: '/home/board', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
