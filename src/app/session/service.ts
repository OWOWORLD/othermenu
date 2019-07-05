import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
//import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
/*
  Generated class for the DashboardProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class LocalStorageService {

  newCoords: any = [];
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {

  }

  public coords(lat: any, lng: any) {
    //get array of tasks from local storage
    const STORAGE_KEY = 'coords';

    const coords = this.storage.get(STORAGE_KEY) || [];
    // push new task to array

    coords.splice(0, 1, { lat: lat, lng: lng });
    // insert updated array to local storage
    this.storage.set(STORAGE_KEY, coords);

    return { success: true };
    // console.log(this.storage
    //   .get(STORAGE_KEY) || 'LocaL storage is empty');
  }

  public affiliate(ref_id: any) {
    //get array of tasks from local storage
    const STORAGE_KEY = 'owo_affiliate';

    const coords = this.storage.get(STORAGE_KEY) || [];
    // push new task to array

    coords.splice(0, 1, { affiliate: ref_id });
    // insert updated array to local storage
    this.storage.set(STORAGE_KEY, coords);

    return { success: true };
    // console.log(this.storage
    //   .get(STORAGE_KEY) || 'LocaL storage is empty');
  }

  public user(user_token: any, user_id: any, user_name: any) {
    //get array of tasks from local storage
    const STORAGE_KEY = 'user';

    const user = this.storage.get(STORAGE_KEY) || [];
    // push new task to array
    if (user.length > 0) {
      console.log(1)
      user.unshift({
        user_token: user_token,
        user_id: user_id,
        user_name: user_name
      });
    } else {
      // console.log(2)

      user.push({
        user_token: user_token,
        user_id: user_id,
        user_name: user_name
      });
    }

    // insert updated array to local storage
    this.storage.set(STORAGE_KEY, user);

    return { success: true };
    // console.log(this.storage
    //   .get(STORAGE_KEY) || 'LocaL storage is empty');
  }

  public clear(key: any) {

    this.storage.remove(key)
  }

  public get(key: any) {
    return this.storage.get(key)
  }

}
