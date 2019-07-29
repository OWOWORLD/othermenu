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

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
  styles: [`
  :host nb-layout-header ::ng-deep nav {
    justify-content: center;
  }
`],
})
export class WalletPage implements OnInit {

  _wallet: FormGroup

  $user: any
  $store: any
  $curator: any
  user_id: any
  user_name: any
  user_token: any
  user_lat: any
  user_lng: any

  btc_value: any
  txt_fee: any
  Duser: any
  Dcurator: any
  activation_fee: any
  currentTheme: string;
  themeSubscription: any;
  fhc = [{ title: 'About Us' }, { title: 'Events' }, { title: 'FAQ' }, { title: 'User Agreement' }, { title: 'Privacy' }];
  curators = [{ title: 'Top Genies' }, { title: 'Closest Genies' }];
  gifts = [{ title: 'CBD  Gifts' }, { title: 'Lifestyle Gifts' }];
  profile = [{ title: 'Profile' }, { title: 'My Restaurant' }, { title: 'Logout' }];

  constructor(private formBuilder: FormBuilder, private storage: Storage, public _storageSerice: LocalStorageService, private sidebarService: NbSidebarService, private _userService: UserService, private themeService: NbThemeService, private nbMenuService: NbMenuService, @Inject(NB_WINDOW) private window) {

    this.$user = _userService
    this.$store = _storageSerice
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

    this.$user.start(this.user_id, this.user_token)
      .then((res: any) => {
        if (res.success) {

          this.btc_value = res.btc_value
          this.txt_fee = res.Tfee_usd * 374
          this.Duser = res.payload[0]

          console.log(this.Duser)
        } else {

          // this.presentAlert('error', 'fix needed', res.message)

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

  private createForm() {

    this._wallet = this.formBuilder.group({
      units: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      address: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });


  }


  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

}
