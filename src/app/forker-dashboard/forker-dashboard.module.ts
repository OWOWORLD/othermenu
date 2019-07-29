import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ForkerDashboardPage } from './forker-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: ForkerDashboardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ForkerDashboardPage]
})
export class ForkerDashboardPageModule {}
