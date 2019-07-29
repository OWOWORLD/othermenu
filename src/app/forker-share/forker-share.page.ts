import { Component, Inject, Input, Output, EventEmitter, NgZone, OnInit } from "@angular/core";
import { NbSidebarService, NB_WINDOW, NbMenuService } from '@nebular/theme';
import { NbThemeService } from '@nebular/theme';
import { filter, map } from 'rxjs/operators';
import { UserService } from '../profile/user.service';
import { LocalStorageService } from '../session/service';
import { AlertController } from '@ionic/angular';
import { Broadcaster } from '@ionic-native/broadcaster/ngx';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ForkerService } from '../forker-dashboard/forker.service';
import { CuratorService } from '../curator-start/curator.service';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

const bucket = new S3(
  {
    accessKeyId: 'AKIAJDI4QT5GVA4XGJ2A',
    secretAccessKey: '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',
    region: 'us-east-2'
  }
);

@Component({
  selector: 'app-forker-share',
  templateUrl: './forker-share.page.html',
  styleUrls: ['./forker-share.page.scss'],
  styles: [`
  :host nb-layout-header ::ng-deep nav {
    justify-content: center;
  },
  :host nb-user ::ng-deep initials {
    color: #fff;
  }
`],
})
export class ForkerSharePage implements OnInit {

  _forkSearch: FormGroup
  _forkEnhancer: FormGroup
  _forkX: FormGroup
  _fork: FormGroup

  $user: any
  $store: any
  $forker: any
  $curator: any
  user_id: any
  user_name: any
  user_token: any
  user_lat: any
  user_lng: any
  alert: any

  Duser: any
  Dsearch: any

  bg_image: any
  currentTheme: string;
  themeSubscription: any;
  show_share: boolean

  restaurantID: any
  restaurantName: any
  restaurantAddress: any
  restaurantAddress2: any

  step: any

  upload_progress: any
  show_preview: any
  DMealImages: any[] = []
  DStrainImages: any[] = []
  DXImages: any[] = []
  Dfork: any[] = []
  Dmeal: any[] = []

  uploadComplete: any

  fhc = [{ title: 'About Us' }, { title: 'Events' }, { title: 'FAQ' }, { title: 'User Agreement' }, { title: 'Privacy' }];
  curators = [{ title: 'Top Genies' }, { title: 'Closest Genies' }];
  gifts = [{ title: 'CBD  Gifts' }, { title: 'Lifestyle Gifts' }];
  profile = [{ title: 'Profile' }, { title: 'My Restaurant' }, { title: 'Logout' }];

  constructor(private router: Router, private _curator: CuratorService, private zone: NgZone, public alertController: AlertController, private _forkerService: ForkerService, private formBuilder: FormBuilder, private storage: Storage, public _storageSerice: LocalStorageService, private sidebarService: NbSidebarService, private _userService: UserService, private themeService: NbThemeService, private nbMenuService: NbMenuService, @Inject(NB_WINDOW) private window) {

    this.$user = _userService
    this.$store = _storageSerice
    this.$forker = _forkerService
    this.$curator = _curator
    this.show_share = false
    this.uploadComplete = false
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

  search(value) {

    this.$curator.searchRestaurant(this.user_id, this.user_token, this._forkSearch.value)
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

  selectRestaurant(yelp_id: any, name: any, address_1: any, address_2: any) {

    this.presentAlert('next step', null, 'add meal details')
    this.restaurantID = yelp_id
    this.restaurantName = name
    this.restaurantAddress = address_1
    this.restaurantAddress2 = address_2

    setTimeout(() => {
      this.step = 2
      this.dismiss()
    }, 2000)

  }

  addMeal() {

    // console.log(this._fork.value)
    this.presentAlert('next step', null, 'add meal enhancer')

    if (Array.isArray(this.Dmeal)) {

      let i: any = new Object()
      i.meal = this._fork.value
      i.mealImages = this.DMealImages
      i.restaurant = [{
        name: this.restaurantName,
        yelp: this.restaurantID,
        address: this.restaurantAddress,
        address2: this.restaurantAddress2

      }],
        this.Dmeal.push(i)

      setTimeout(() => {
        // console.log(this.Dmeal)
        this.dismiss()
        this.upload_progress = null
        this.uploadComplete = null

        this.step = 3

      }, 2000)

    } else {

      let a: any = this._fork.value
      let i: any = new Object()
      i.mealImages = this.DMealImages
      a.push(i)
      this.Dmeal = a

      setTimeout(() => {
        console.log(this.Dmeal)
        this.upload_progress = null
        this.uploadComplete = null

        this.step = 3

      }, 2000)
    }

  }

  addStrain() {

    // console.log(this._fork.value)
    this.presentAlert('last step', null, 'additional experiences')

    if (Array.isArray(this.Dmeal)) {

      let a: any = this.Dmeal[0]
      a.strain = this._forkEnhancer.value
      a.strainImages = this.DStrainImages
      this.Dmeal[0] = a

      setTimeout(() => {
        // console.log(this.Dmeal)
        this.dismiss()
        this.upload_progress = null
        this.uploadComplete = null

        this.step = 4

      }, 2000)

    } else {

      // let a: any = this._fork.value
      // let i: any = new Object()
      // i.mealImages = this.DMealImages
      // a.push(i)
      // this.Dmeal = a
      //
      // setTimeout(() => {
      //   console.log(this.Dmeal)
      //
      //   this.step = 3
      //
      // }, 2000)
    }

  }

  addX() {

    this.presentAlert('please wait...', null, 'adding  your fork')

    if (Array.isArray(this.Dmeal)) {

      let a: any = this.Dmeal[0]
      a.x = this._forkX.value
      a.xImages = this.DXImages
      this.Dmeal[0] = a

      this.$forker.fork(this.user_id, this.user_token, this.Dmeal[0])
        .then((res: any) => {
          if (res.success) {

            this.dismiss()
            setTimeout(() => {

              this.presentAlert('done...', null, 'fork added')
              setTimeout(() => {

                this.router.navigate(["/order/smell/" + res.fork_id]);

              }, 2000)
              // this.upload_progress = null
              // this.uploadComplete = null
              //
              // this.step = null
              // this.DXImages = []
              // this.DMealImages = []
              // this.DStrainImages = []

            }, 2000)

          } else {

            this.presentAlert('error', 'fix needed', res.message)

          }
        })

    }

  }
  selectFile(event: any, Utype: any) {

    let key;
    let files = event.srcElement.files;
    this.upload_progress = 0;
    if (files[0].name) {
      this.show_preview = true

    }

    for (var i = 0, len = files.length; i < len; i++) {

      let file = files[i]
      let key = 'forks/' + this.user_id + '/' + file.name

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

          // console.log(Utype)
          this.zone.run(() => {
            if (Utype == 1) {
              this.DMealImages.push({ image: 'https://dwulu0vacaktc.cloudfront.net/' + data.Key })
              console.log(this.DMealImages)

            }
            if (Utype == 2) {
              this.DStrainImages.push({ image: 'https://dwulu0vacaktc.cloudfront.net/' + data.Key })
              console.log(this.DStrainImages)

            }
            if (Utype == 3) {
              this.DXImages.push({ image: 'https://dwulu0vacaktc.cloudfront.net/' + data.Key })
              console.log(this.DXImages)

            }
          })

        }
      }).on('httpUploadProgress', (progress) => {

        this.upload_progress = Math.round(progress.loaded / progress.total * 100)
        this.zone.run(() => {

          if (i == len) {

            this.uploadComplete = true
            this.upload_progress = null

          }

        })
        // console.log(this.upload_progress)
        //Swal("UPLOADING...", Math.round(progress.loaded / progress.total * 100) + '% done', "success");

      })

    }

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

    this._fork = this.formBuilder.group({
      category: new FormControl('', Validators.compose([
        Validators.required
      ])),
      title: new FormControl('', Validators.compose([
        Validators.required
      ])),
      details: new FormControl('', Validators.compose([
        Validators.required
      ])),
      price: new FormControl('', Validators.compose([
        Validators.required
      ])),
      serving: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });

    this._forkSearch = this.formBuilder.group({
      city: new FormControl(''),
      name: new FormControl(''),
    });

    this._forkEnhancer = this.formBuilder.group({
      strain: new FormControl('', Validators.compose([
        Validators.required
      ])),
      name: new FormControl('', Validators.compose([
        Validators.required
      ])),
      profile: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });

    this._forkX = this.formBuilder.group({
      type: new FormControl('', Validators.compose([
        Validators.required
      ])),
      title: new FormControl('', Validators.compose([
        Validators.required
      ])),
      videoUrl: new FormControl(''),
      musicUrl: new FormControl(''),
      gameUrl: new FormControl(''),
      otherUrl: new FormControl(''),
      details: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });

  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

}
