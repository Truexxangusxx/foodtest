import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapsLatLng,
  CameraPosition,
  GoogleMapsMarkerOptions,
  GoogleMapsMarker
} from 'ionic-native';
import { Geolocation } from 'ionic-native';
import { LoadingController } from 'ionic-angular';
import { Headers, RequestOptions } from '@angular/http';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';


@Component({
  selector: 'page-mapaproveedor',
  templateUrl: 'mapaproveedor.html'
})
export class MapaproveedorPage {
  user = { id: '' };
  map;
  nombre = "";
  direccion = "";
  horario = "";
  lat=1;
  lon=1;
  constructor(public navCtrl: NavController, public platform: Platform, public alertCtrl: AlertController
    , public loadingCtrl: LoadingController, public http: Http, public storage: Storage) {

    this.platform.ready().then(() => {
      this.loadMap();
    });

    storage.get('token').then((val) => {

      var link = 'https://movilapp-xxangusxx.c9users.io/auth_token?token={' + val + '}';
      var datos = JSON.stringify({});
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post(link, datos, { headers: headers })
        .map(res => res.json())
        .subscribe(data => {

          if (data['error']) {
            this.navCtrl.push(HomePage);
          }
          else {
            this.user = data['user'];
          }

        });

    })

  }


  loadMap() {

    Geolocation.getCurrentPosition().then(pos => {
      console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);

      this.lat = pos.coords.latitude;
      this.lon = pos.coords.longitude;
      let longitud = pos.coords.longitude;
      let latitude = pos.coords.latitude;

      let location = new GoogleMapsLatLng(latitude, longitud);
      this.map = new GoogleMap('map2', {
        'backgroundColor': 'white',
        'controls': {
          'compass': true,
          'myLocationButton': true,
          'indoorPicker': true,
          'zoom': true,
        },
        'gestures': {
          'scroll': true,
          'tilt': true,
          'rotate': true,
          'zoom': true
        },
        'camera': {
          'latLng': location,
          'tilt': 30,
          'zoom': 15,
          'bearing': 50
        }
      });
      this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
        console.log('Map is ready!');
      });


    });


  }


  guardar() {
    let loading = this.loadingCtrl.create({ content: 'Pensando ...' });
    loading.present(loading);


    var link = 'https://movilapp-xxangusxx.c9users.io/ProveedorGuardar';
    var datos = JSON.stringify({ nombre: this.nombre, direccion: this.direccion, horario: this.horario, user_id: this.user.id, lat: this.lat, lon: this.lon });
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log(datos);
    this.http.post(link, datos, { headers: headers })
      .map(res => res.json())
      .subscribe(data => {


        loading.dismiss();

        if (data['error']) {
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: data['msg'],
            buttons: ['OK']
          });
          alert.present();
        }
        else {
          let alert = this.alertCtrl.create({
            title: 'Funciono',
            subTitle: "nos vamos a otra pagina",
            buttons: ['OK']
          });
          alert.present();
        }

      });

  }






  ionViewDidLoad() {
    console.log('Hello MapaproveedorPage Page');
  }

}
