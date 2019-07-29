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
import { ActivatedRoute } from '@angular/router';
import { ForkerService } from '../forker-dashboard/forker.service';

@Component({
  selector: 'app-order-smell',
  templateUrl: './order-smell.page.html',
  styleUrls: ['./order-smell.page.scss'],
  styles: [`
  :host nb-layout-header ::ng-deep nav {
    justify-content: center;
  },
  :host nb-user ::ng-deep initials {
    color: #fff;
  }
`],
})
export class OrderSmellPage implements OnInit {

  $user: any
  $store: any
  $curator: any
  $forker: any

  user_id: any
  user_name: any
  user_token: any
  user_lat: any
  user_lng: any

  alert: any

  Duser: any
  Dmeal: any
  fork_id: any

  cat = [{ title: 'African Food' }, { title: 'American Food' }, { title: 'Chinese Food' }, { title: 'Indian Food' }, { title: 'Spanish Food' }, { title: 'Middle Eastern Food' }, { title: 'Vegetarian' }, { title: 'Vegan' }];
  sort = [{ title: 'Price Lowest' }, { title: 'Price Highest' }, { title: 'One item' }, { title: 'Combo' }, { title: 'Deserts' }];
  profile = [{ title: 'Profile' }, { title: 'My Restaurant' }, { title: 'Logout' }];

  constructor(private _forkerService: ForkerService, private route: ActivatedRoute, private router: Router, public alertController: AlertController, private geolocation: Geolocation, private zone: NgZone, private _curator: CuratorService, private formBuilder: FormBuilder, private storage: Storage, public _storageSerice: LocalStorageService, private sidebarService: NbSidebarService, private _userService: UserService, private themeService: NbThemeService, private nbMenuService: NbMenuService, @Inject(NB_WINDOW) private window) {

    this.$user = _userService
    this.$store = _storageSerice
    this.$curator = _curator
    this.$forker = _forkerService

  }

  ngOnInit() {

  }
  ionViewDidEnter() {
    this.session()
  }
  session() {

    this.fork_id = this.route.snapshot.paramMap.get('fork_id');

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
    this.start()

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
      });
  }

  start() {

    this.$forker.getFork(this.user_id, this.user_token, this.fork_id)
      .then((res: any) => {
        if (res.success) {

          this.zone.run(() => {
            this.Dmeal = res.payload[0]
            this.Duser = res.payload[1]
            // console.log(res)

          })

        } else {

          this.zone.run(() => {
            this.Dmeal = res.payload[0]
            this.Duser = res.payload[1]
            // console.log(res)

          })
          // this.presentAlert('error', 'fix needed', res.message)

        }
        // console.log(res)
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
    // this.themeSubscription.unsubscribe();
  }

}
