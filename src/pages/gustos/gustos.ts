import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Headers, RequestOptions } from '@angular/http';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { MapaPage } from '../mapa/mapa';

/*
  Generated class for the Gustos page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-gustos',
  templateUrl: 'gustos.html'
})
export class GustosPage {

  gustos=[];

  constructor(public navCtrl: NavController
  , public http: Http
  , public alertCtrl: AlertController
  ) {



    var link = 'http://localhost:8000/GustosListar';
    var datos = JSON.stringify({  });
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post(link, datos, { headers: headers })
      .map(res => res.json())
      .subscribe(data => {
        this.gustos = data["gustos"];

        if (data['error']) {
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: "Ocurrio un error inesperado",
            buttons: ['OK']
          });
          alert.present();
        }


      });


  }



guardar(){
  this.navCtrl.push(MapaPage);
}



  ionViewDidLoad() {
    console.log('Hello GustosPage Page');
  }

}
