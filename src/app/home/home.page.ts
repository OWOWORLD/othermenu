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
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  styles: [`
  :host nb-layout-header ::ng-deep nav {
    justify-content: center;
  },
  :host nb-user ::ng-deep initials {
    color: #fff;
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
  Dorder: any
  Dforks: any

  currentTheme: string;
  themeSubscription: any;
  alert: any
  cookieValue: any
  fhc = [{ title: 'About Us' }, { title: 'Events' }, { title: 'FAQ' }, { title: 'User Agreement' }, { title: 'Privacy' }];
  curators = [{ title: 'Top Genies' }, { title: 'Closest Genies' }];
  gifts = [{ title: 'CBD  Gifts' }, { title: 'Lifestyle Gifts' }];
  profile = [{ title: 'Profile' }, { title: 'Wallet' }, { title: 'My Restaurant' }, { title: 'Logout' }];

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
    private ga: GoogleAnalytics,
    private router: Router,
    private cookieService: CookieService

  ) {

    this.$user = _userService
    this.$store = _storageSerice

    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.currentTheme = theme.name;
    });
  }

  async ngOnInit() {

    this.cookieValue = this.cookieService.get('foodhigh');
    let time: any = new Date().getTime()
    if (!this.cookieValue) {

      this.$user.getIP()
        .then((res: any) => {
          let loc = res.loc.split(',');
          this.user_lat = loc[0]
          this.user_lng = loc[1]
          this.storage.set('lat', this.user_lat);
          this.storage.set('lng', this.user_lng);
          this.cookieService.set('foodhigh', time);
          this.cookieService.set('foodhighlat', this.user_lat);
          this.cookieService.set('foodhighlng', this.user_lng);
          this.start()
          // console.log('cookie saved')
        })

    } else {
      // console.log('cookie active' + this.cookieValue)
      this.user_lat = await this.cookieService.get('foodhighlat');
      if (!this.user_lat) {

        this.$user.getIP()
          .then((res: any) => {
            let loc = res.loc.split(',');
            this.user_lat = loc[0]
            this.user_lng = loc[1]
            this.cookieService.set('foodhighlat', this.user_lat);
            this.cookieService.set('foodhighlng', this.user_lng);
            this.start()
            // console.log('cookie saved')
          })

      } else {

        this.user_lat = await this.cookieService.get('foodhighlat');
        this.user_lng = await this.cookieService.get('foodhighlng');
        this.user_id = await this.storage.get('user_id')
        this.user_token = await this.storage.get('token')
        this.start()

      }
    }

  }
  ionViewDidEnter() {

    this.session()
  }
  session() {



    this.ga.startTrackerWithId('UA-67843796-1')
      .then(() => {

        this.ga.trackView('home', '', true);
        if (this.user_id) {
          this.ga.setUserId(this.user_id)
        }
      })
      .catch(e => console.log('Error starting GoogleAnalytics', e));

    this.get_geo()
  }

  get_geo() {
    // console.log("works")
    // this.user_lat = 37.730730
    // this.user_lng = -122.387980
    // this.start()

    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.dismiss()
      this.user_lat = resp.coords.latitude
      this.user_lng = resp.coords.longitude
      this.storage.set('lat', resp.coords.latitude);
      this.storage.set('lng', resp.coords.longitude);
      this.cookieService.set('foodhighlat', this.user_lat);
      this.cookieService.set('foodhighlng', this.user_lng);

      // console.log(resp)
    }).catch((error) => {

      // console.log('Error getting location', error);
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data: any) => {
      if (data.code != 2) {
        // console.log(data)
        // console.log(data.message)
        this.user_lat = data.coords.latitude
        this.user_lng = data.coords.longitude
        this.storage.set('lat', data.coords.latitude);
        this.storage.set('lng', data.coords.longitude);
        this.cookieService.set('foodhighlat', this.user_lat);
        this.cookieService.set('foodhighlng', this.user_lng);

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
          this.Dorder = res.payload[1]
          this.Dforks = res.payload[2]
          // this.Dorders = res.payload[1]
          // this.dismiss()
          // console.log(res)

        } else {

          this.zone.run(() => {
            this.user_id = null
            this.logout()

          })
          // this.presentAlert('error', 'fix needed', res.message)

        }
        // console.log(res)
      })

    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'fhc' || tag === 'curators' || tag === 'gifts' || tag === 'profile'),
        map(({ item: { title } }) => title),
    )
      .subscribe(title => {

        // fhc = [{ title: 'About Us' }, { title: 'Events' }, { title: 'FAQ' }, { title: 'User Agreement' }, { title: 'Privacy' }];
        // curators = [{ title: 'Top Genies' }, { title: 'Closest Genies' }];
        // gifts = [{ title: 'CBD  Gifts' }, { title: 'Lifestyle Gifts' }];
        // profile = [{ title: 'Profile' }, { title: 'My Restaurant' }, { title: 'Logout' }];

        if (title == "About Us") {
          this.router.navigate(["/about"]);
        }
        if (title == "Events") {

          this.presentAlert('coming  soon', null, 'Events coming soon')

        }
        if (title == "FAQ") {
          this.router.navigate(["/chat"]);
        }
        if (title == "User Agreement") {
          this.router.navigate(["/user-agreement"]);
        }
        if (title == "Privacy") {
          this.router.navigate(["/user-privacy"]);
        }
        if (title == "Profile") {
          this.router.navigate(["/profile"]);
        }
        if (title == "Wallet") {
          this.router.navigate(["/wallet"]);
        }
        if (title == "Logout") {
          this.logout()
        }
      });
  }

  falseStart() {

    if (!this.user_lat && !this.user_lng) {

      this.presentAlert('location error', null, 'we\'ll need your location to get forks in your area')
      setTimeout(() => {
        this.dismiss()
        this.get_geo()

      }, 2000)
    } else {

      this.router.navigate(["/order/delivery"]);

    }
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
    // console.log("reached")
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
