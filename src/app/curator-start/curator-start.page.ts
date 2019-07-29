import { Component, Inject, Input, Output, EventEmitter, NgZone, OnInit } from "@angular/core";
import { NbSidebarService, NB_WINDOW, NbMenuService } from '@nebular/theme';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NbThemeService } from '@nebular/theme';
import { filter, map } from 'rxjs/operators';
import { UserService } from '../profile/user.service';
import { CuratorService } from './curator.service';
import { LocalStorageService } from '../session/service';
import { AlertController } from '@ionic/angular';
import { Broadcaster } from '@ionic-native/broadcaster/ngx';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-curator-start',
  templateUrl: './curator-start.page.html',
  styleUrls: ['./curator-start.page.scss'],
  styles: [`
  :host nb-layout-header ::ng-deep nav {
    justify-content: center;
  }
`],
})
export class CuratorStartPage implements OnInit {

  _curator: FormGroup

  $user: any
  $store: any
  $curator: any
  user_id: any
  user_name: any
  user_token: any
  user_lat: any
  user_lng: any

  Duser: any
  Dcurator: any
  activation_fee: any
  currentTheme: string;
  themeSubscription: any;

  show_activate: boolean;
  alert: any

  fhc = [{ title: 'About Us' }, { title: 'Events' }, { title: 'FAQ' }, { title: 'User Agreement' }, { title: 'Privacy' }];
  curators = [{ title: 'Top Genies' }, { title: 'Closest Genies' }];
  gifts = [{ title: 'CBD  Gifts' }, { title: 'Lifestyle Gifts' }];
  profile = [{ title: 'Profile' }, { title: 'My Restaurant' }, { title: 'Logout' }];

  _Vcur = {
    'fname': [
      { type: 'required', message: 'whats your first name?' },
    ],
    'lname': [
      { type: 'required', message: 'whats your last name?' },
    ],
    'phone': [
      { type: 'required', message: 'whats your phone #?' },
      { type: 'minlength', message: 'your phone number real?' }

    ],
    'agree': [
      { type: 'required', message: 'do you love to make people happy?' },
    ]
  };
  constructor(private zone: NgZone, private router: Router, public alertController: AlertController, private formBuilder: FormBuilder, private storage: Storage, public _curatorService: CuratorService, public _storageSerice: LocalStorageService, private sidebarService: NbSidebarService, private _userService: UserService, private themeService: NbThemeService, private nbMenuService: NbMenuService, @Inject(NB_WINDOW) private window) {

    this.$user = _userService
    this.$store = _storageSerice
    this.$curator = _curatorService
    this.show_activate = false;
    this.createForm()
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.currentTheme = theme.name;
    });
  }

  ngOnInit() {

  }
  ionViewDidEnter() {
    this.session()
    this.start()

  }
  session() {

    this.storage.forEach((value: any, key: string, iterationNumber: Number) => {
      if (key == 'token') {
        this.user_token = value
      }
      if (key == 'user_id') {
        this.user_id = value
        if (value) {
          this.start()

        }
      }
      if (key == 'user_name') {
        this.user_name = value

      }
    });

  }

  start() {

    // this.presentAlert('please  wait', null, 'loading your profile')

    this.$curator.start(this.user_id, this.user_token)
      .then((res: any) => {
        if (res.success) {

          this.zone.run(() => {

            this.activation_fee = res.activation_fee
            this.Duser = res.payload[1]
            this.Dcurator = res.payload[0]

          })

        } else {

          this.activation_fee = res.activation_fee
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

  tryActivate(form: any) {

    this.$curator.activate(this.user_id, this.user_token, form)
      .then((res: any) => {
        if (res.success) {

          this.presentAlert('done!', null, res.message)
          setTimeout(() => {

            this.dismiss()

            this.router.navigate(["/curator/dashboard"]);

          }, 2000)
        } else {
          console.log(res)

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

  private createForm() {

    this._curator = this.formBuilder.group({
      fname: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      lname: new FormControl('', Validators.compose([
        Validators.required
      ])),
      phone: new FormControl('', Validators.compose([
        Validators.minLength(7),
        Validators.required
      ])),
      agree: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });
  }
  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

}
