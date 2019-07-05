import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NbThemeModule, NbLayoutModule, NbSidebarModule, NbMenuModule, NbSidebarService, NbThemeService } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { IonicStorageModule } from '@ionic/storage';
import { LocalStorageService } from './session/service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Device } from '@ionic-native/device/ngx';
import { PinDialog } from '@ionic-native/pin-dialog/ngx';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [FormsModule,
    ReactiveFormsModule,
    BrowserModule, IonicModule.forRoot(), HttpClientModule, AppRoutingModule, NbThemeModule.forRoot({ name: 'default' }), NbLayoutModule, NbEvaIconsModule, NbSidebarModule.forRoot(), NbMenuModule.forRoot(), IonicStorageModule.forRoot()],
  providers: [
    StatusBar,
    SplashScreen,
    NbSidebarService,
    NbThemeService,
    LocalStorageService,
    Geolocation,
    Device,
    PinDialog,
    GoogleAnalytics,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
