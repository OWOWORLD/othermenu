import { Component, Inject, OnInit, NgZone } from '@angular/core';
import { NbSidebarService, NB_WINDOW, NbMenuService } from '@nebular/theme';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NbThemeService } from '@nebular/theme';
import { filter, map } from 'rxjs/operators';
import { UserService } from '../profile/user.service';
import { CuratorService } from '../curator-start/curator.service';
import { LocalStorageService } from '../session/service';
import { AlertController } from '@ionic/angular';
import { Broadcaster } from '@ionic-native/broadcaster/ngx';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import Swal from 'sweetalert2'
import { Geolocation } from '@ionic-native/geolocation/ngx';

const bucket = new S3(
  {
    accessKeyId: 'AKIAJDI4QT5GVA4XGJ2A',
    secretAccessKey: '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',
    region: 'us-east-2'
  }
);

@Component({
  selector: 'app-curator-dashboard',
  templateUrl: './curator-dashboard.page.html',
  styleUrls: ['./curator-dashboard.page.scss'],
  styles: [`
  :host nb-layout-header ::ng-deep nav {
    justify-content: center;
  }
`],

})
export class CuratorDashboardPage implements OnInit {

  _gift: FormGroup
  _fee: FormGroup

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
  Dorders: any
  activation_fee: any
  currentTheme: string;
  themeSubscription: any;
  isOnline: boolean;
  show_add_gift: boolean;
  show_edit_fee: boolean;
  alert: any
  upload_progress: any
  show_preview: any
  Dimages: any[] = []
  Dgifts: any[] = []

  fhc = [{ title: 'About Us' }, { title: 'Events' }, { title: 'FAQ' }, { title: 'User Agreement' }, { title: 'Privacy' }];
  curators = [{ title: 'Top Genies' }, { title: 'Closest Genies' }];
  gifts = [{ title: 'CBD  Gifts' }, { title: 'Lifestyle Gifts' }];
  profile = [{ title: 'Profile' }, { title: 'My Restaurant' }, { title: 'Logout' }];

  _Vgift = {
    'title': [
      { type: 'required', message: 'what\'s this items name?' },
    ],
    'type': [
      { type: 'required', message: 'what type of gift is this?' },
    ],
    'details': [
      { type: 'required', message: 'Gift  info?' },

    ],
    'agree': [
      { type: 'required', message: 'is  this  an  awesome gift?' },
    ],
    'price': [
      { type: 'required', message: 'what would be the  retail price?' },
    ]
  };
  constructor(private geolocation: Geolocation, private zone: NgZone, private router: Router, public alertController: AlertController, private formBuilder: FormBuilder, private storage: Storage, public _curatorService: CuratorService, public _storageSerice: LocalStorageService, private sidebarService: NbSidebarService, private _userService: UserService, private themeService: NbThemeService, private nbMenuService: NbMenuService, @Inject(NB_WINDOW) private window) {

    this.$user = _userService
    this.$store = _storageSerice
    this.$curator = _curatorService
    this.show_add_gift = false;
    this.isOnline = false
    this.show_edit_fee = false
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
          this.get_geo()
        }
      }
      if (key == 'user_name') {
        this.user_name = value

      }
    });

  }

  start() {

    // this.presentAlert('please  wait', null, 'loading your profile')
    if (this.alert) {
      this.dismiss()
    }
    this.$curator.start(this.user_id, this.user_token, this.user_lat, this.user_lng)
      .then((res: any) => {
        if (res.success) {

          this.activation_fee = res.activation_fee
          this.Duser = res.payload[2]
          this.Dcurator = res.payload[0]
          if (this.Dcurator) {
            this.zone.run(() => {
              this.Dgifts = this.Dcurator.gifts
              this.Dorders = res.payload[1]
              this.isOnline = this.Dcurator.online

            })
          }
          console.log(res)
        } else {

          this.activation_fee = res.activation_fee
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

  tryAddGift(form: any) {

    this.$curator.addGift(this.user_id, this.user_token, form, this.Dimages)
      .then((res: any) => {
        if (res.success) {

          this.presentAlert('done!', null, res.message)
          setTimeout(() => {

            this.dismiss()
            this._gift.reset()
            this.Dimages = []
            this.start()


          }, 2000)
        } else {
          console.log(res)

        }
      })

  }

  tryFee(value: any) {
    console.log(value)
    this.$curator.editFee(this.user_id, this.user_token, value)
      .then((res: any) => {
        if (res.success) {

          this.presentAlert('done!', null, res.message)
          setTimeout(() => {

            this.dismiss()
            this._fee.reset()
            this.start()


          }, 2000)
        } else {
          console.log(res)

        }
      })

  }

  goOnline(value) {

    this.$curator.goOnline(this.user_id, this.user_token, value)
      .then((res: any) => {
        if (res.success) {

          this.presentAlert('done!', null, res.message)
          setTimeout(() => {

            this.dismiss()
            this.start()

          }, 2000)
        } else {
          // console.log(res)

        }
      })

  }

  selectFile(event: any) {

    console.log(event)
    let key;
    let files = event.srcElement.files;
    this.upload_progress = 0;
    if (files[0].name) {
      this.show_preview = true

    }

    for (var i = 0, len = files.length; i < len; i++) {

      let file = files[i]
      let key = 'gifts/' + this.user_id + '/' + file.name

      let params = {
        Bucket: 'foodhigh',
        Key: key,
        Body: file
      };

      let name = file.name
      let type = file.type
      let size = file.size
      bucket.upload(params, (err: any, data: any) => {
        if (err) {

          Swal.fire("ERROR!...", err, "error")

          this.upload_progress = null


        } else {

          this.Dimages.push({ image: 'https://dwulu0vacaktc.cloudfront.net/' + data.Key })
          // console.log(this.Dimages)

        }
      }).on('httpUploadProgress', (progress) => {

        this.upload_progress = Math.round(progress.loaded / progress.total * 100)
        // console.log(this.upload_progress)
        //Swal("UPLOADING...", Math.round(progress.loaded / progress.total * 100) + '% done', "success");

      });

    }

  }
  acceptOrder(value: any) {

    this.$curator.accept(this.user_id, this.user_token, value)
      .then((res: any) => {
        if (res.success) {

          this.presentAlert('done!', null, res.message)
          setTimeout(() => {

            this.dismiss()
            this.start()

          }, 2000)
        } else {
          // console.log(res)

        }
      })
  }
  declineOrder() {

  }

  get_geo() {

    // this.presentAlert('please wait', null, 'getting your location')

    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.dismiss()
      this.user_lat = resp.coords.latitude
      this.user_lng = resp.coords.longitude
      this.$store.coords(resp.coords.latitude, resp.coords.longitude)
      this.$curator.setGeo(this.user_id, this.user_token, this.user_lat, this.user_lng)

      this.start()
      // console.log(resp)
    }).catch((error) => {
      this.dismiss()
      this.presentAlert('error', null, 'error getting your location')

      // console.log('Error getting location', error);
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data: any) => {
      if (data.code != 2) {
        // console.log(data)ß
        // console.log(data.message)
        this.user_lat = data.coords.latitude
        this.user_lng = data.coords.longitude
        this.$store.coords(data.coords.latitude, data.coords.longitude)
        this.$curator.setGeo(this.user_id, this.user_token, this.user_lat, this.user_lng)

      }
    }, (error: any) => {
      // console.log(error)
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

    this._gift = this.formBuilder.group({
      title: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      details: new FormControl('', Validators.compose([
        Validators.required
      ])),
      type: new FormControl('', Validators.compose([
        Validators.required
      ])),
      agree: new FormControl('', Validators.compose([
        Validators.required
      ])),
      store: new FormControl('', Validators.compose([
        Validators.required
      ])),
      price: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });

    this._fee = this.formBuilder.group({
      fee: new FormControl('', Validators.compose([
        Validators.required,
      ])),

    });
  }
  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

}
