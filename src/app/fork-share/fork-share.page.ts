import { Component, Inject, OnInit } from '@angular/core';
import { NbSidebarService, NB_WINDOW, NbMenuService } from '@nebular/theme';
import { NbThemeService } from '@nebular/theme';
import { filter, map } from 'rxjs/operators';
import { UserService } from '../profile/user.service';
import { LocalStorageService } from '../session/service';
import { AlertController } from '@ionic/angular';
import { Broadcaster } from '@ionic-native/broadcaster/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-fork-share',
  templateUrl: './fork-share.page.html',
  styleUrls: ['./fork-share.page.scss'],
  styles: [`
  :host nb-layout-header ::ng-deep nav {
    justify-content: center;
  }
`],

})
export class ForkSharePage implements OnInit {

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
  rest = [{ title: 'restaurants' }, { title: 'caterers' }, { title: 'events' }, { title: 'foodtrucks' }];
  curators = [{ title: 'Past Curators' }];

  constructor(private storage: Storage, public _storageSerice: LocalStorageService, private sidebarService: NbSidebarService, private _userService: UserService, private themeService: NbThemeService, private nbMenuService: NbMenuService, @Inject(NB_WINDOW) private window) {

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
        this.user_id = value

      }
      if (key == 'user_name') {
        this.user_name = value
        this.start()

      }
    });

    // this.broadcaster.addEventListener('logout').subscribe((event) => {
    //   // console.log(event)
    //   this.user_id = null
    //   this.user_name = null
    // });

  }

  start() {

    // this.presentAlert('please  wait', null, 'loading your profile')

    this.$user.start(this.user_id, this.user_token)
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

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

}
