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

@Component({
  selector: 'app-order-checkout',
  templateUrl: './order-checkout.page.html',
  styleUrls: ['./order-checkout.page.scss'],
  styles: [`
  :host nb-layout-header ::ng-deep nav {
    justify-content: center;
  }
`],
})
export class OrderCheckoutPage implements OnInit {

  _pickup: FormGroup

  $user: any
  $store: any
  $curator: any
  user_id: any
  user_name: any
  user_token: any
  user_lat: any
  user_lng: any
  city: any
  Duser: any
  Dsearch: any[] = []
  Dorder: any
  Dcurators: any[] = []
  show_delivery: boolean
  show_curators: boolean
  show_deposit: boolean
  show_address_form: boolean
  alert: any
  bg_image: any
  currentTheme: string;
  themeSubscription: any;
  restaurantID: any
  restaurantName: any
  restaurantAddress: any
  restaurantAddress2: any
  btc_value: any
  fhc = [{ title: 'About Us' }, { title: 'Events' }, { title: 'FAQ' }, { title: 'User Agreement' }, { title: 'Privacy' }];
  curators = [{ title: 'Top Genies' }, { title: 'Closest Genies' }];
  gifts = [{ title: 'CBD  Gifts' }, { title: 'Lifestyle Gifts' }];
  profile = [{ title: 'Profile' }, { title: 'My Restaurant' }, { title: 'Logout' }];

  constructor(private router: Router, public alertController: AlertController, private geolocation: Geolocation, private zone: NgZone, private _curator: CuratorService, private formBuilder: FormBuilder, private storage: Storage, public _storageSerice: LocalStorageService, private sidebarService: NbSidebarService, private _userService: UserService, private themeService: NbThemeService, private nbMenuService: NbMenuService, @Inject(NB_WINDOW) private window) {

    this.$user = _userService
    this.$store = _storageSerice
    this.$curator = _curator
    this.show_delivery = false
    this.show_curators = false
    this.show_deposit = false
    this.show_address_form = false
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
  session() {

    this.storage.forEach((value: any, key: string, iterationNumber: Number) => {

      if (key == 'token') {
        this.user_token = value
      }
      if (key == 'user_id') {
        this.user_id = value
        this.start()
      }
      if (key == 'user_name') {
        this.user_name = value

      }

    });

  }

  start() {

    this.$user.start(this.user_id, this.user_token)
      .then((res: any) => {
        if (res.success) {
          // this.Tfee = res.Tfee
          // this.Tfee_usd = res.Tfee_usd
          this.btc_value = res.btc_value
          this.zone.run(() => {
            this.Duser = res.payload[0]
            this.Dorder = res.payload[1]
            // console.log(this.Dorder)

          })
          // this.Dorders = res.payload[1]
          // this.dismiss()
          console.log(this.Duser)

        } else {

          this.zone.run(() => {
            this.user_id = null
            this.logout()

          })
          // this.presentAlert('error', 'fix needed', res.message)

        }
      })

    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'fhc' || tag === 'curators' || tag === 'gifts' || tag === 'profile'),
        map(({ item: { title } }) => title),
    )
      .subscribe(title => {

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
        if (title == "Logout") {
          this.logout()
        }
      });
  }

  pay() {

    if (this.Duser.address.length > 0) {

      this.$user.pay(this.user_id, this.user_token)
        .then((res: any) => {
          if (res.success) {

            this.presentAlert('done!', 'thanks for ordering', res.message)

          } else {

            this.zone.run(() => {
              this.user_id = null
              this.logout()

            })
            // this.presentAlert('error', 'fix needed', res.message)

          }
        })
    } else {

      this.presentAlert('error', null, 'Your Delivery Address Is Needed')

    }

  }

  cancel() {


    this.$user.cancelOrder(this.user_id, this.user_token)
      .then((res: any) => {
        if (res.success) {

          this.presentAlert('done!', null, res.message)
          setTimeout(() => {
            this.start()
          }, 2000)

        } else {

          this.presentAlert('error', 'fix needed', res.message)

        }
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

  logout() {
    localStorage.clear();
    this.storage.clear()
    this.$store.clear('user')
    this.$store.clear('coords')
    setTimeout(() => {
      this.user_id = null
      this.user_name = null
    })

  }
  createForm() {

  }
}
