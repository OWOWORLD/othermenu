import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { OrderCheckoutPage } from './order-checkout.page';
import { NbThemeModule, NbRouteTabsetModule, NbInputModule, NbButtonModule, NbUserModule, NbLayoutModule, NbCardModule, NbActionsModule, NbTabsetModule, NbSidebarModule, NbIconModule, NbMenuModule, NbSelectModule, NbContextMenuModule, } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
        component: OrderCheckoutPage
      }
    ])
  ],
  declarations: [OrderCheckoutPage]
})
export class OrderCheckoutPageModule { }
