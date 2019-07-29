
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
export class UserService {

  constructor(public http: HttpClient) {
    //console.log('Hello SessionProvider Provider');
  }
  doLogin(form: any, device: any) {

    let DATA = {
      user_email: form.email,
      user_password: form.password,
      form: form,
      device: device

    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return new Promise(resolve => {
      this.http.post('https://app.foodhigh.club/login', DATA, httpOptions)
        .subscribe(data => {
          //console.log(data)
          resolve(data);
        }, err => {
          console.log(err);
        });
    });
  }
  doReset(form: any, device: any) {

    let DATA = {
      user_email: form.email,
      user_password: form.password,
      form: form,
      device: device

    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return new Promise(resolve => {
      this.http.post('https://app.foodhigh.club/user/reset', DATA, httpOptions)
        .subscribe(data => {
          //console.log(data)
          resolve(data);
        }, err => {
          console.log(err);
        });
    });
  }

  doResetConfirm(form: any, device: any) {

    let DATA = {
      user_email: form.email,
      user_password: form.password,
      form: form,
      device: device

    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return new Promise(resolve => {
      this.http.post('https://app.foodhigh.club/user/reset/confirm', DATA, httpOptions)
        .subscribe(data => {
          //console.log(data)
          resolve(data);
        }, err => {
          console.log(err);
        });
    });
  }

  doIP() {

    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json'
    //   })
    // };
    //
    // return new Promise(resolve => {
    //   this.http.post('https://api.myip.com', null, httpOptions)
    //     .subscribe(data => {
    //       //console.log(data)
    //       resolve(data);
    //     }, err => {
    //       console.log(err);
    //     });
    // });
  }

  doRegister(form: any, device: any) {

    let DATA = {
      user_name: form.username,
      user_email: form.email,
      user_password: form.password,
      form: form,
      device: device
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return new Promise(resolve => {
      this.http.post('https://app.foodhigh.club/register', DATA, httpOptions)
        .subscribe(data => {
          //console.log(data)
          resolve(data);
        }, err => {
          console.log(err);
        });
    });
  }
  start(user_id: any, user_token: any, lat: any, lng: any) {
    // console.log(user_id, user_token)
    let DATA = {

      user_id: user_id,
      user_token: user_token,
      lat: lat,
      lng: lng

    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return new Promise(resolve => {
      this.http.post('https://app.foodhigh.club/user/start', DATA, httpOptions)
        .subscribe((data: any) => {
          //console.log(data)
          resolve(data);
        }, err => {
          console.log(err);
        });
    });
  }

  getIP() {
    //https://ipinfo.io/developers/replacing-getcurrentposition
    // console.log(user_id, user_token)
    return new Promise(resolve => {
      this.http.get('https://ipinfo.io/geo')
        .subscribe((data: any) => {
          //console.log(data)
          resolve(data);
        }, err => {
          console.log(err);
        });
    });
  }

  pay(user_id: any, user_token: any) {
    // console.log(user_id, user_token)
    let DATA = {

      user_id: user_id,
      user_token: user_token

    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return new Promise(resolve => {
      this.http.post('https://app.foodhigh.club/cart/pay', DATA, httpOptions)
        .subscribe(data => {
          //console.log(data)
          resolve(data);
        }, err => {
          console.log(err);
        });
    });
  }
  cancelOrder(user_id: any, user_token: any) {
    // console.log(user_id, user_token)
    let DATA = {

      user_id: user_id,
      user_token: user_token

    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return new Promise(resolve => {
      this.http.post('https://app.foodhigh.club/cart/cancel', DATA, httpOptions)
        .subscribe(data => {
          //console.log(data)
          resolve(data);
        }, err => {
          console.log(err);
        });
    });
  }
  session(device: any) {
    // console.log(user_id, user_token)
    let DATA = {

      device: device,

    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return new Promise(resolve => {
      this.http.post('https://app.foodhigh.club/user/session', DATA, httpOptions)
        .subscribe(data => {
          //console.log(data)
          resolve(data);
        }, err => {
          console.log(err);
        });
    });
  }

  send(user_id: any, user_token: any, form: any, To) {
    // console.log(user_id, user_token)
    let DATA = {

      user_id: user_id,
      user_token: user_token,
      form: form,
      To: To

    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return new Promise(resolve => {
      this.http.post('https://app.foodhigh.club/user/sendBitcoin', DATA, httpOptions)
        .subscribe(data => {
          //console.log(data)
          resolve(data);
        }, err => {
          console.log(err);
        });
    });
  }

  doAddress(user_id: any, user_token: any, form: any) {
    // console.log(user_id, user_name)
    let DATA = {

      form: form,
      user_id: user_id,
      token: user_token

    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return new Promise(resolve => {
      this.http.post('https://app.foodhigh.club/user/addAddress', DATA, httpOptions)
        .subscribe(data => {
          //console.log(data)
          resolve(data);
        }, err => {
          console.log(err);
        });
    });
  }

  update(user_id: any, user_token: any, form: any) {
    // console.log(user_id, user_name)
    let DATA = {

      form: form,
      user_id: user_id,
      token: user_token

    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return new Promise(resolve => {
      this.http.post('https://app.foodhigh.club/user/update', DATA, httpOptions)
        .subscribe(data => {
          //console.log(data)
          resolve(data);
        }, err => {
          console.log(err);
        });
    });
  }

  reOrder(user_id: any, user_token: any, order_id: any) {
    // console.log(user_id, user_name)
    let DATA = {

      order_id: order_id,
      user_id: user_id,
      token: user_token

    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return new Promise(resolve => {
      this.http.post('https://app.foodhigh.club/cart/reOrder', DATA, httpOptions)
        .subscribe(data => {
          //console.log(data)
          resolve(data);
        }, err => {
          console.log(err);
        });
    });
  }

  getOrderHistory(user_id: any, user_token: any) {
    // console.log(user_id, user_token)
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
      this.http.post('https://app.foodhigh.club/user/orderHistory', DATA, httpOptions)
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
