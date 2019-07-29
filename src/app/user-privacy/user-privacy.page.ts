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
  selector: 'app-user-privacy',
  templateUrl: './user-privacy.page.html',
  styleUrls: ['./user-privacy.page.scss'],
  styles: [`
  :host nb-layout-header ::ng-deep nav {
    justify-content: center;
  }
`],

})
export class UserPrivacyPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
