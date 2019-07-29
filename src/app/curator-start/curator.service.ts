
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
export class CuratorService {

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
      this.http.post('https://app.foodhigh.club/curator/start', DATA, httpOptions)
        .subscribe(data => {
          //console.log(data)
          resolve(data);
        }, err => {
          console.log(err);
        });
    });
  }

  activate(user_id: any, user_token, form: any) {

    let DATA = {
      user_id: user_id,
      user_token: user_token,
      form: form,
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return new Promise(resolve => {
      this.http.post('https://app.foodhigh.club/curator/activate', DATA, httpOptions)
        .subscribe(data => {
          //console.log(data)
          resolve(data);
        }, err => {
          console.log(err);
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

  getCurators(user_id: any, user_token, yelp_id: any) {

    let DATA = {
      user_id: user_id,
      user_token: user_token,
      yelp_id: yelp_id,
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return new Promise(resolve => {
      this.http.post('https://app.foodhigh.club/curator/getCurators', DATA, httpOptions)
        .subscribe(data => {
          //console.log(data)
          resolve(data);
        }, err => {
          console.log(err);
        });
    });
  }

  setGeo(user_id: any, user_token, user_lat: any, user_lng: any) {

    let DATA = {
      user_id: user_id,
      user_token: user_token,
      user_lat: user_lat,
      user_lng: user_lng,
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return new Promise(resolve => {
      this.http.post('https://app.foodhigh.club/curator/setGeo', DATA, httpOptions)
        .subscribe(data => {
          //console.log(data)
          resolve(data);
        }, err => {
          console.log(err);
        });
    });
  }

  editFee(user_id: any, user_token, form: any) {

    let DATA = {
      user_id: user_id,
      user_token: user_token,
      form: form,
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return new Promise(resolve => {
      this.http.post('https://app.foodhigh.club/curator/editFee', DATA, httpOptions)
        .subscribe(data => {
          //console.log(data)
          resolve(data);
        }, err => {
          console.log(err);
        });
    });
  }

  acceptOrder(user_id: any, user_token, order_id: any) {

    let DATA = {
      user_id: user_id,
      user_token: user_token,
      order_id: order_id,
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return new Promise(resolve => {
      this.http.post('https://app.foodhigh.club/curator/order/accept', DATA, httpOptions)
        .subscribe(data => {
          //console.log(data)
          resolve(data);
        }, err => {
          console.log(err);
        });
    });
  }

  checkout(user_id: any, user_token, yelp_id: any, curator: any) {

    let DATA = {
      user_id: user_id,
      user_token: user_token,
      yelp_id: yelp_id,
      curator: curator,
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return new Promise(resolve => {
      this.http.post('https://app.foodhigh.club/curator/checkout', DATA, httpOptions)
        .subscribe(data => {
          //console.log(data)
          resolve(data);
        }, err => {
          console.log(err);
        });
    });
  }

  searchRestaurant(user_id: any, user_token, form: any, city: any) {

    let DATA = {
      user_id: user_id,
      user_token: user_token,
      form: form,
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return new Promise(resolve => {
      this.http.post('https://app.foodhigh.club/curator/searchRestaurant', DATA, httpOptions)
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
