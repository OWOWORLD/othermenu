import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'order/delivery', loadChildren: './order-delivery/order-delivery.module#OrderDeliveryPageModule' },
  { path: 'order/fork', loadChildren: './order-fork/order-fork.module#OrderForkPageModule' },
  { path: 'session', loadChildren: './session/session.module#SessionPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'wallet', loadChildren: './wallet/wallet.module#WalletPageModule' },
  { path: 'events', loadChildren: './events/events.module#EventsPageModule' },
  { path: 'fork/share', loadChildren: './fork-share/fork-share.module#ForkSharePageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
