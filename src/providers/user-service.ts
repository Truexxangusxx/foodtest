import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Headers, RequestOptions } from '@angular/http';


@Injectable()
export class UserService {
  data: any;

  constructor(public http: Http) {
    console.log('Hello UserService Provider');
    this.data = null;
  }

  load(nombre, email, password, repassword) {
    if (this.data) {
      //already loaded data
      return Promise.resolve(this.data);
    }

    //dont have the data yet
    var link = 'http://192.168.0.10:8000/signup';
    var datos = JSON.stringify({ name: nombre, email: email, password: password, password_confirmation: repassword });
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log(datos);

    return new Promise(resolve => {
      this.http.post(link, datos, {headers:headers})
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

}
