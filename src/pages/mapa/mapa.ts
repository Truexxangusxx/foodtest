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


@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html'
})
export class MapaPage {
  private map;
  private posicion;
  constructor(public navCtrl: NavController, public platform: Platform, public alertCtrl: AlertController) {

    //this.platform.ready().then(() => this.loadMap());
    this.platform.ready().then(() => {
      this.getCurrentPosition();
    });

  }


  getCurrentPosition() {
    Geolocation.getCurrentPosition()
      .then(position => {

        let lat = position.coords.latitude;
        let lng = position.coords.longitude;

        this.posicion = new GoogleMapsLatLng(lat, lng)

        this.loadMap();
      });
  }

  loadMap() {

    this.map = new GoogleMap('map', {
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
        'latLng': this.posicion,
        'tilt': 30,
        'zoom': 15,
        'bearing': 50
      }
    });
    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
      //console.log('Map is ready!');
      this.setMarker();
    });


  }


  setMarker() {
    //icono personalizado
    let customMarker = "https://movilapp-xxangusxx.c9users.io/icon";
    // create new marker
    let markerOptions: GoogleMapsMarkerOptions = {
      position: this.posicion,
      title: 'Primer proveedor',
      icon: customMarker
    };

    this.map.addMarker(markerOptions)
      .then((marker: GoogleMapsMarker) => {
        marker.showInfoWindow();
      });
  }




  ionViewDidLoad() {
    console.log('Hello MapaPage Page');
  }

}
