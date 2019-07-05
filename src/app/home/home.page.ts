import { Component, Inject, Input, Output, EventEmitter, NgZone, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NbSidebarService, NB_WINDOW, NbMenuService } from '@nebular/theme';
import { NbThemeService } from '@nebular/theme';
import { filter, map } from 'rxjs/operators';
import { UserService } from '../profile/user.service';
import { LocalStorageService } from '../session/service';
import { AlertController } from '@ionic/angular';
import { Broadcaster } from '@ionic-native/broadcaster/ngx';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Device } from '@ionic-native/device/ngx';
import { PinDialog } from '@ionic-native/pin-dialog/ngx';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  styles: [`
  :host nb-layout-header ::ng-deep nav {
    justify-content: center;
  }
`],
})
export class HomePage implements OnInit {

  $user: any
  $store: any
  user_id: any
  user_name: any
  user_token: any
  user_lat: any
  user_lng: any

  Duser: any

  currentTheme: string;
  themeSubscription: any;
  alert: any

  fhc = [{ title: 'About Us' }, { title: 'Events' }, { title: 'FAQ' }, { title: 'User Agreement' }, { title: 'Privacy' }];
  curators = [{ title: 'Top Curators' }, { title: 'Closest Curators' }];
  gifts = [{ title: 'CBD  Gifts' }, { title: 'Lifestyle Gifts' }];
  profile = [{ title: 'Profile' }, { title: 'My Restaurant' }, { title: 'Logout' }];

  constructor(
    private storage: Storage,
    public _storageSerice: LocalStorageService,
    private sidebarService: NbSidebarService,
    private _userService: UserService,
    private themeService: NbThemeService,
    private nbMenuService: NbMenuService,
    @Inject(NB_WINDOW) private window,
    public alertController: AlertController,
    private geolocation: Geolocation,
    private pinDialog: PinDialog,
    private zone: NgZone,
    private device: Device,
    private ga: GoogleAnalytics

  ) {

    this.$user = _userService
    this.$store = _storageSerice

    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.currentTheme = theme.name;
    });
  }

  ngOnInit() {

  }
  ionViewDidEnter() {

    this.session()
  }
  session() {

    this.storage.forEach((value: any, key: string, iterationNumber: Number) => {
      if (key == 'token') {
        this.user_token = value
      }
      if (key == 'user_id') {
        if (value) {

          this.user_id = value
          this.start()

        } else {

          this.get_geo()

        }

      }
      if (key == 'user_name') {
        this.user_name = value

      }
    });

    this.ga.startTrackerWithId('UA-67843796-1')
      .then(() => {

        this.ga.trackView('home', '', true);
        if (this.user_id) {
          this.ga.setUserId(this.user_id)
        }
      })
      .catch(e => console.log('Error starting GoogleAnalytics', e));

    // this.broadcaster.addEventListener('logout').subscribe((event) => {
    //   // console.log(event)
    //   this.user_id = null
    //   this.user_name = null
    // });

  }

  get_geo() {

    this.presentAlert('please wait', null, 'getting your location')

    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.dismiss()
      this.user_lat = resp.coords.latitude
      this.user_lng = resp.coords.longitude
      this.$store.coords(resp.coords.latitude, resp.coords.longitude)
      this.start()
      // console.log(resp)
    }).catch((error) => {
      this.dismiss()
      this.presentAlert('error', null, 'error getting your location')

      // console.log('Error getting location', error);
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data: any) => {
      if (data.code != 2) {
        // console.log(data)
        // console.log(data.message)
        this.user_lat = data.coords.latitude
        this.user_lng = data.coords.longitude
        this.$store.coords(data.coords.latitude, data.coords.longitude)

      }
    }, (error: any) => {
      // console.log(error)
    })
  }
  start() {

    // this.presentAlert('please  wait', null, 'loading your profile')

    this.$user.start(this.user_id, this.user_token, this.user_lat, this.user_lng)
      .then((res: any) => {
        if (res.success) {
          // this.Tfee = res.Tfee
          // this.Tfee_usd = res.Tfee_usd
          // this.btc_value = res.btc_value
          this.Duser = res.payload[0]
          // this.Dorders = res.payload[1]
          // this.dismiss()
          // console.log(this.btc_value)

        } else {

          this.zone.run(() => {
            this.user_id = null
            this.logout()

          })
          // this.presentAlert('error', 'fix needed', res.message)

        }
        console.log(res)
      })

    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'restaurant'),
        map(({ item: { title } }) => title),
    )
      .subscribe(title => this.window.alert(`${title} was clicked!`));
  }

  doRefresh(event) {
    setTimeout(() => {
      // console.log('Async operation has ended');
      event.target.complete();
      this.start()
    }, 2000);
  }
  async presentAlert(title: any, sub_title: any, message: any) {
    this.alert = await this.alertController.create({
      header: title,
      subHeader: sub_title,
      message: message,
      buttons: ['OK']
    });

    await this.alert.present();
  }
  public dismiss() {
    if (this.alert && !this.alert._detached) this.alert.dismiss();
  }

  logout() {
    console.log("reached")
    localStorage.clear();
    this.storage.clear()
    this.$store.clear('user')
    this.$store.clear('coords')
    setTimeout(() => {
      this.user_id = null
      this.user_name = null
    })

  }
  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
