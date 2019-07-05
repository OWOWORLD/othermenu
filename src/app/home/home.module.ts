import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { NbThemeModule, NbRouteTabsetModule, NbButtonModule, NbUserModule, NbLayoutModule, NbCardModule, NbActionsModule, NbTabsetModule, NbSidebarModule, NbIconModule, NbMenuModule, NbSelectModule, NbContextMenuModule, } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

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
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule { }
