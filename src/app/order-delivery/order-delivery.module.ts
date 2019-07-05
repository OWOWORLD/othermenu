import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { OrderDeliveryPage } from './order-delivery.page';
import { NbThemeModule, NbRouteTabsetModule, NbInputModule, NbButtonModule, NbUserModule, NbLayoutModule, NbCardModule, NbActionsModule, NbTabsetModule, NbSidebarModule, NbIconModule, NbMenuModule, NbSelectModule, NbContextMenuModule, } from '@nebular/theme';
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
    NbInputModule,
    RouterModule.forChild([
      {
        path: '',
        component: OrderDeliveryPage
      }
    ])
  ],
  declarations: [OrderDeliveryPage]
})
export class OrderDeliveryPageModule { }
