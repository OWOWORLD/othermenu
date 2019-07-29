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
@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  styles: [`
  :host nb-layout-header ::ng-deep nav {
    justify-content: center;
  },
  :host nb-user ::ng-deep initials {
    color: #fff;
  }
`],
})
export class AboutPage implements OnInit {

  constructor(private zone: NgZone, private router: Router, public alertController: AlertController, private formBuilder: FormBuilder, private storage: Storage, public _curatorService: CuratorService, public _storageSerice: LocalStorageService, private sidebarService: NbSidebarService, private _userService: UserService, private themeService: NbThemeService, private nbMenuService: NbMenuService, @Inject(NB_WINDOW) private window) {


  }

  ngOnInit() {

  }
  ionViewDidEnter() {

  }




}
