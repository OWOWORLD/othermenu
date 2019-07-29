import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NbSidebarService, NB_WINDOW, NbMenuService } from '@nebular/theme';
import { NbThemeService } from '@nebular/theme';
import { filter, map } from 'rxjs/operators';
import { UserService } from '../profile/user.service';
import { ForkerService } from '../forker-dashboard/forker.service';
import { LocalStorageService } from '../session/service';
import { AlertController } from '@ionic/angular';
import { Broadcaster } from '@ionic-native/broadcaster/ngx';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';

@Component({
  selector: 'app-forker-onboard',
  templateUrl: './forker-onboard.page.html',
  styleUrls: ['./forker-onboard.page.scss'],
  styles: [`
  :host nb-layout-header ::ng-deep nav {
    justify-content: center;
  },
  :host nb-user ::ng-deep initials {
    color: #fff;
  }
`],
})
export class ForkerOnboardPage implements OnInit {

  _onboard: FormGroup
  _yelp: FormGroup

  $user: any
  $store: any
  $forker: any
  user_id: any
  user_name: any
  user_token: any
  user_lat: any
  user_lng: any

  Duser: any
  Dyelp: any
  bg_image: any
  currentTheme: string;
  themeSubscription: any;
  alert: any
  show_form: boolean

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private ga: GoogleAnalytics,
    public alertController: AlertController, private storage: Storage, public _storageSerice: LocalStorageService, private sidebarService: NbSidebarService, private _userService: UserService, private _forkerService: ForkerService, private themeService: NbThemeService, private nbMenuService: NbMenuService, @Inject(NB_WINDOW) private window) {

    this.$user = _userService
    this.$store = _storageSerice
    this.$forker = _forkerService
    this.show_form = false
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
        if (value) {

          this.user_id = value
          this.start()

        } else {

          //this.get_geo()

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
  start() {

    this.$forker.start(this.user_id, this.user_token)
      .then((res: any) => {
        if (res.success) {


        } else {
          // this.presentAlert('error', 'fix needed', res.message)
        }
      })

  }
  tryYelp(value) {

    this.presentAlert('please wait', null, 'getting yelp info')

    this.$forker.yelp(this.user_id, this.user_token, this._yelp.value)
      .then((res: any) => {
        if (res.success) {

          this.dismiss()
          this.Dyelp = res.payload

        } else {
          this.presentAlert('error', 'fix needed', res.message)
        }
        console.log(res)
      })

  }

  private createForm() {

    this._yelp = this.formBuilder.group({

      name: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });

    this._onboard = this.formBuilder.group({

      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
    });

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
}
