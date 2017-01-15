import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {RegistroPage} from '../registro/registro';
import { LoadingController } from 'ionic-angular';
import { Headers, RequestOptions } from '@angular/http';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
import {PerfilPage} from '../perfil/perfil';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  registroPage = RegistroPage;

  contenido = {};
  email = "";
  password = "";

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public http: Http, public alertCtrl: AlertController,public storage: Storage) {

     storage.get('token').then((val) => {
       console.log('Your token is', val);
     
    let loading = this.loadingCtrl.create({ content: 'Pensando ...' });
    loading.present(loading);


    var link = 'https://movilapp-xxangusxx.c9users.io/auth_token?token={'+val+'}';
    var datos = JSON.stringify({ });
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post(link, datos, { headers: headers })
      .map(res => res.json())
      .subscribe(data => {
        this.contenido = data;
        console.log(this.contenido);

        loading.dismiss();

        if (this.contenido['error']) {
          
        }
        else{
          this.navCtrl.push(PerfilPage);
        }

      });
    
  })





  }



  ingresar() {
    let loading = this.loadingCtrl.create({ content: 'Pensando ...' });
    loading.present(loading);


    var link = 'https://movilapp-xxangusxx.c9users.io/auth_login';
    var datos = JSON.stringify({ email: this.email, password: this.password });
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log(datos);

    this.http.post(link, datos, { headers: headers })
      .map(res => res.json())
      .subscribe(data => {
        this.contenido = data;
        console.log(this.contenido);
        this.storage.set('token', this.contenido['token']);


        loading.dismiss();

        if (this.contenido['error']) {
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: this.contenido['msg'],
            buttons: ['OK']
          });
          alert.present();
        }
        else{
          this.navCtrl.push(PerfilPage);
        }

      });

  }



}
