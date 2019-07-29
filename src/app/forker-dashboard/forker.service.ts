
import { throwError as observableThrowError, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

/*
  Generated class for the SessionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable({
  providedIn: 'root',
})
export class ForkerService {

  constructor(public http: HttpClient) {
    //console.log('Hello SessionProvider Provider');
  }
  start(user_id: any, user_token: any) {

    let DATA = {
      user_id: user_id,
      user_token: user_token,

    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return new Promise(resolve => {
      this.http.post('https://app.foodhigh.club/forker/start', DATA, httpOptions)
        .subscribe(data => {
          //console.log(data)
          resolve(data);
        }, err => {
          console.log(err);
        });
    });
  }

  fork(user_id: any, user_token: any, fork: any) {
    console.log(fork)

    let DATA = {
      user_id: user_id,
      user_token: user_token,
      meal: fork.meal,
      mealImages: fork.mealImages,
      strain: fork.strain,
      strainImages: fork.strainImages,
      x: fork.x,
      xImages: fork.xImages,
      restaurant: fork.restaurant
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return new Promise(resolve => {
      this.http.post('https://app.foodhigh.club/forker/fork', DATA, httpOptions)
        .subscribe(data => {
          //console.log(data)
          resolve(data);
        }, err => {
          console.log(err);
        });
    });
  }
  yelp(user_id: any, user_token, form: any) {

    let DATA = {
      user_id: user_id,
      user_token: user_token,
      form: form
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return new Promise(resolve => {
      this.http.post('https://app.foodhigh.club/forker/yelp', DATA, httpOptions)
        .subscribe(data => {
          //console.log(data)
          resolve(data);
        }, err => {
          console.log(JSON.stringify(err));
        });
    });
  }

  addGift(user_id: any, user_token, form: any, images: any) {

    let DATA = {
      user_id: user_id,
      user_token: user_token,
      form: form,
      images: images
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return new Promise(resolve => {
      this.http.post('https://app.foodhigh.club/curator/addGift', DATA, httpOptions)
        .subscribe(data => {
          //console.log(data)
          resolve(data);
        }, err => {
          console.log(err);
        });
    });
  }

  getFork(user_id: any, user_token, fork_id: any) {

    let DATA = {
      user_id: user_id,
      user_token: user_token,
      fork_id: fork_id,
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return new Promise(resolve => {
      this.http.post('https://app.foodhigh.club/forker/getFork', DATA, httpOptions)
        .subscribe(data => {
          //console.log(data)
          resolve(data);
        }, err => {
          console.log(err);
        });
    });
  }

  goOnline(user_id: any, user_token, value: any) {

    let DATA = {
      user_id: user_id,
      user_token: user_token,
      value: value,
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return new Promise(resolve => {
      this.http.post('https://app.foodhigh.club/curator/goOnline', DATA, httpOptions)
        .subscribe(data => {
          //console.log(data)
          resolve(data);
        }, err => {
          console.log(err);
        });
    });
  }


  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return observableThrowError(errMsg);
  }

}
