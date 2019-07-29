import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ForkerOnboardPage } from './forker-onboard.page';
import { NbCheckboxModule, NbThemeModule, NbRouteTabsetModule, NbInputModule, NbButtonModule, NbUserModule, NbLayoutModule, NbCardModule, NbActionsModule, NbTabsetModule, NbSidebarModule, NbIconModule, NbMenuModule, NbSelectModule, NbContextMenuModule, } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

const routes: Routes = [
  {
    path: '',
    component: ForkerOnboardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NbLayoutModule,
    NbIconModule,
    NbMenuModule,
    NbSelectModule,
    NbActionsModule,
    NbCardModule,
    NbEvaIconsModule,
    NbTabsetModule,
    NbSidebarModule,
    NbThemeModule,
    NbUserModule,
    NbButtonModule,
    NbRouteTabsetModule,
    NbContextMenuModule,
    NbInputModule,
    NbCheckboxModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ForkerOnboardPage]
})
export class ForkerOnboardPageModule { }
