import { Component, Inject, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-session',
  templateUrl: './session.page.html',
  styleUrls: ['./session.page.scss'],
  styles: [`
  :host nb-layout-header ::ng-deep nav {
    justify-content: center;
  }
`],
})
export class SessionPage implements OnInit {

  _login: FormGroup
  _register: FormGroup
  _reset: FormGroup
  _resetConfirm: FormGroup

  $user: any
  $store: any
  user_id: any
  user_name: any
  user_token: any
  user_lat: any
  user_lng: any

  Duser: any

  bg_image: any
  currentTheme: string;
  themeSubscription: any;
  alert: any
  show_login: boolean
  show_register: boolean
  show_confirm: boolean
  show_reset: boolean

  constructor(
    private device: Device,
    private router: Router,
    private formBuilder: FormBuilder,
    public alertController: AlertController, private storage: Storage, public _storageSerice: LocalStorageService, private sidebarService: NbSidebarService, private _userService: UserService, private themeService: NbThemeService, private nbMenuService: NbMenuService, @Inject(NB_WINDOW) private window) {

    this.$user = _userService
    this.$store = _storageSerice
    this.show_register = false
    this.createForm()
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.currentTheme = theme.name;
    });
  }

  ngOnInit() {
  }

  tryLogin(value) {

    this.presentAlert('please wait', null, 'granting access...')

    this.$user.doLogin(value, this.device.uuid)
      .then((res: any) => {
        if (res.success) {
          // console.log(res)
          this.dismiss()
          this.storage.set('token', res.token);
          this.storage.set('user_id', res.user_id);
          this.storage.set('user_name', res.user_name);

          this.presentAlert('done!', null, res.message)
          setTimeout(() => {

            this.dismiss()

            this.router.navigate(["/home"]);

          }, 2000)
        } else {
          this.presentAlert('error', 'fix needed', res.message)

        }
        // console.log(res)
      }, err => {
        console.log(err)
      })
  }

  tryRegister(value: any) {

    this.presentAlert('please wait', null, 'granting access...')
    // console.log(value)
    this.$user.doRegister(value, this.device.uuid)
      .then((res: any) => {
        if (res.success) {
          // console.log(res)
          this.dismiss()
          this.storage.set('token', res.token);
          this.storage.set('user_id', res.user_id);
          this.storage.set('user_name', res.user_name);

          this.presentAlert('done!', null, res.message)
          setTimeout(() => {

            this.dismiss()

            this.router.navigate(["/home"]);

          }, 2000)

        } else {

          this.presentAlert('error', 'fix needed', res.message)

        }
        // console.log(res)
      }, err => {
        console.log(err)
      })
  }

  tryReset(value: any) {

    this.presentAlert('please wait', null, 'sending email...')
    // console.log(value)
    this.$user.doReset(value, this.device.uuid)
      .then((res: any) => {
        if (res.success) {
          // console.log(res)
          this.dismiss()
          this.storage.set('token', res.token);
          this.storage.set('user_id', res.user_id);
          this.storage.set('user_name', res.user_name);

          this.presentAlert('done!', null, res.message)
          setTimeout(() => {

            this.dismiss()

            this.router.navigate(["/home"]);

          }, 2000)

        } else {

          this.presentAlert('error', 'fix needed', res.message)

        }
        // console.log(res)
      }, err => {
        console.log(err)
      })
  }

  private createForm() {

    this._login = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });

    this._register = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.required
      ])),
      agree: new FormControl('', Validators.compose([
        Validators.required
      ])),
      age: new FormControl('', Validators.compose([
        Validators.required
      ])),
      refer: new FormControl(''),
    });

    this._reset = this.formBuilder.group({
      email: ['', Validators.required],
    });

    this._resetConfirm = this.formBuilder.group({
      code: ['', Validators.required],
      password: ['', Validators.required],
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
