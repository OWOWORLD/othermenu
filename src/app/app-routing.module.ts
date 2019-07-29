import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from "@angular/common";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'order/delivery', loadChildren: './order-delivery/order-delivery.module#OrderDeliveryPageModule' },
  { path: 'order/fork', loadChildren: './order-fork/order-fork.module#OrderForkPageModule' },
  { path: 'session', loadChildren: './session/session.module#SessionPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'wallet', loadChildren: './wallet/wallet.module#WalletPageModule' },
  { path: 'events', loadChildren: './events/events.module#EventsPageModule' },
  { path: 'curator/start', loadChildren: './curator-start/curator-start.module#CuratorStartPageModule' },
  { path: 'curator/dashboard', loadChildren: './curator-dashboard/curator-dashboard.module#CuratorDashboardPageModule' },
  { path: 'forker/share', loadChildren: './forker-share/forker-share.module#ForkerSharePageModule' },
  { path: 'forker/dashboard', loadChildren: './forker-dashboard/forker-dashboard.module#ForkerDashboardPageModule' },
  { path: 'forker/onboard', loadChildren: './forker-onboard/forker-onboard.module#ForkerOnboardPageModule' },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'user-agreement', loadChildren: './user-agreement/user-agreement.module#UserAgreementPageModule' },
  { path: 'user-privacy', loadChildren: './user-privacy/user-privacy.module#UserPrivacyPageModule' },
  { path: 'order/checkout', loadChildren: './order-checkout/order-checkout.module#OrderCheckoutPageModule' },
  { path: 'order/smell/:fork_id', loadChildren: './order-smell/order-smell.module#OrderSmellPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]

})
export class AppRoutingModule { }
