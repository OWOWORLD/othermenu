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
import { CuratorService } from '../curator-start/curator.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-order-delivery',
  templateUrl: './order-delivery.page.html',
  styleUrls: ['./order-delivery.page.scss'],
  styles: [`
  :host nb-layout-header ::ng-deep nav {
    justify-content: center;
  }
`],

})
export class OrderDeliveryPage implements OnInit {

  _pickup: FormGroup

  $user: any
  $store: any
  $geo: any
  $curator: any
  user_id: any
  user_name: any
  user_token: any
  user_lat: any
  user_lng: any
  city: any
  Duser: any
  Dsearch: any[] = []
  Dcurators: any[] = []
  Dforks: any
  Dmeal: any
  show_delivery: boolean
  show_curators: boolean
  show_smell: boolean
  alert: any
  bg_image: any
  currentTheme: string;
  themeSubscription: any;
  restaurantID: any
  restaurantName: any
  restaurantAddress: any
  restaurantAddress2: any
  geolocationPosition: any

  cat = [{ title: 'African Food' }, { title: 'American Food' }, { title: 'Chinese Food' }, { title: 'Indian Food' }, { title: 'Spanish Food' }, { title: 'Middle Eastern Food' }, { title: 'Vegetarian' }, { title: 'Vegan' }];
  sort = [{ title: 'Price Lowest' }, { title: 'Price Highest' }, { title: 'One item' }, { title: 'Combo' }, { title: 'Deserts' }];
  profile = [{ title: 'Profile' }, { title: 'My Restaurant' }, { title: 'Logout' }];

  constructor(private cookieService: CookieService, private sanitizer: DomSanitizer, private router: Router, public alertController: AlertController, private geolocation: Geolocation, private zone: NgZone, private _curator: CuratorService, private formBuilder: FormBuilder, private storage: Storage, public _storageSerice: LocalStorageService, private sidebarService: NbSidebarService, private _userService: UserService, private themeService: NbThemeService, private nbMenuService: NbMenuService, @Inject(NB_WINDOW) private window) {

    this.$user = _userService
    this.$store = _storageSerice
    this.$curator = _curator
    this.show_delivery = false
    this.show_curators = false
    this.Dforks = {}
    this.createForm()
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.currentTheme = theme.name;
    });
  }

  ngOnInit() {


  }

  ionViewDidEnter() {
    this.session()
  }
  async session() {

    this.user_lat = await this.cookieService.get('foodhighlat');
    this.user_lng = await this.cookieService.get('foodhighlng');
    this.user_id = await this.storage.get('user_id')
    this.user_token = await this.storage.get('token')

    this.start()
    this.get_geo()

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

  start() {


    // this.presentAlert('please  wait', null, 'loading your profile')
    // console.log(this.user_id, this.user_token, this.user_lat, this.user_lng)
    this.$user.start(this.user_id, this.user_token, this.user_lat, this.user_lng)
      .then((res: any) => {
        if (res.success) {

          this.zone.run(() => {

            this.Duser = res.payload[0]
            this.Dforks = res.payload[3]

            // let f: any = res.payload[3].forks
            // this.Dforks = this.sanitizer.bypassSecurityTrustHtml(f)
            // if (res.payload[3]) {
            //   this.Dforks = res.payload[3].forks
            //
            // }

          })
        } else {

          this.zone.run(() => {
            this.dismiss()

            this.Duser = res.payload[0]
            this.Dforks = res.payload[3]
            if (this.Duser) {
              this.Dforks = this.Duser.local_menus

            }
            // let f: any = res.payload[3].forks
            // this.Dforks = this.sanitizer.bypassSecurityTrustHtml(f)
            // if (res.payload[3]) {
            //   this.Dforks = res.payload[3].forks
            //
            // }

          })


        }

        // console.log(res)
      })

    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'restaurant'),
        map(({ item: { title } }) => title),
    )
      .subscribe(title => this.window.alert(`${title} was clicked!`));
  }


  p(value: any) {

    let f = this.Dforks.find((x: any) => x.id == value)

    console.log(JSON.parse(f.fork))
    return JSON.parse(f.fork)
  }

  search(value: any) {

    this.$curator.searchRestaurant(this.user_id, this.user_token, this._pickup.value)
      .then((res: any) => {
        if (res.success) {

          this.zone.run(() => {
            this.Dsearch = res.payload.businesses

          })
          // console.log(res.payload)

        } else {

          // this.presentAlert('error', 'fix needed', res.message)

        }
      })

  }

  smell(value: any) {
    this.show_smell = true
    this.Dmeal = value
    console.log(this.Dmeal)
  }
  selectRestaurant(yelp_id: any, name: any, address_1: any, address_2: any) {

    this.presentAlert('please  wait', null, 'good choice, updating...')
    this.restaurantID = yelp_id
    this.restaurantName = name
    this.restaurantAddress = address_1
    this.restaurantAddress2 = address_2

    this.$curator.getCurators(this.user_id, this.user_token, this.restaurantID)
      .then((res: any) => {
        if (res.success) {

          this.zone.run(() => {
            this.Dcurators = res.payload

          })
          console.log(res.payload)

        } else {

          // this.presentAlert('error', 'fix needed', res.message)

        }
      })
    setTimeout(() => {
      this.show_curators = true
      this.show_delivery = false
      this.dismiss()

    }, 2000)
  }

  checkout(curator: any) {

    this.presentAlert('please  wait', null, 'checking out...')

    this.$curator.checkout(this.user_id, this.user_token, this.restaurantID, curator)
      .then((res: any) => {
        if (res.success) {

          this.zone.run(() => {

            setTimeout(() => {
              this.dismiss()

              this.router.navigate(["/order/checkout"]);

              // this.presentAlert('error', 'fix needed', res.message)

            }, 2000)
          })

        } else {

          this.presentAlert('error', 'fix needed', res.message)
          setTimeout(() => {
            this.dismiss()
          }, 3000)
        }
      })

  }

  tryPickup(value: any) {

  }
  private createForm() {

    this._pickup = this.formBuilder.group({

      name: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      city: new FormControl('', Validators.compose([
        Validators.required,
      ])),

    });

  }
  get_geo() {

    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.user_lat = resp.coords.latitude
      this.user_lng = resp.coords.longitude
      this.storage.set('lat', resp.coords.latitude);
      this.storage.set('lng', resp.coords.longitude);
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

        this.$store.coords(data.coords.latitude, data.coords.longitude)

      }
    }, (error: any) => {
      // console.log(error)
    })

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
  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
