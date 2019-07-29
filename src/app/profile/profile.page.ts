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
import { Router } from '@angular/router';
import { Device } from '@ionic-native/device/ngx';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  styles: [`
  :host nb-layout-header ::ng-deep nav {
    justify-content: center;
  }
`],

})
export class ProfilePage implements OnInit {

  _address: FormGroup

  $user: any
  $store: any
  user_id: any
  user_name: any
  user_token: any
  user_lat: any
  user_lng: any

  Duser: any
  show_edit_profile: boolean
  show_add_address: boolean
  alert: any

  constructor(
    private device: Device,
    private router: Router,
    private formBuilder: FormBuilder,
    private ga: GoogleAnalytics,
    private zone: NgZone,
    public alertController: AlertController, private storage: Storage, public _storageSerice: LocalStorageService, private sidebarService: NbSidebarService, private _userService: UserService, private themeService: NbThemeService, private nbMenuService: NbMenuService, @Inject(NB_WINDOW) private window) {

    this.$user = _userService
    this.$store = _storageSerice
    this.show_edit_profile = false
    this.createForm()
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

          // this.get_geo()

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

    this.$user.start(this.user_id, this.user_token)
      .then((res: any) => {
        if (res.success) {
          // this.Tfee = res.Tfee
          // this.Tfee_usd = res.Tfee_usd
          // this.btc_value = res.btc_value
          this.zone.run(() => {
            this.Duser = res.payload[0]

          })
          // this.Dorders = res.payload[1]
          // this.dismiss()
          // console.log(this.Duser)

        } else {

          // this.presentAlert('error', 'fix needed', res.message)

        }
        // console.log(res)
      })

  }
  tryAddress(value) {

    this.$user.doAddress(this.user_id, this.user_token, value)
      .then((res: any) => {
        if (res.success) {
          //console.log(res)
          this.presentAlert('success', 'done', res.message)
          this.start()
        } else {

          this.presentAlert('error', 'fix needed', res.message)

        }
        // console.log(res)
      }, err => {
        //this.errorMessage = err.message;
        console.log(err)
      })
  }

  private createForm() {

    this._address = this.formBuilder.group({
      fname: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      lname: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      phone: new FormControl('', Validators.compose([
        Validators.minLength(7),
        Validators.required
      ])),
      address: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      address2: new FormControl(''),
      city: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      state: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      zip: new FormControl('', Validators.compose([
        Validators.required,
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
