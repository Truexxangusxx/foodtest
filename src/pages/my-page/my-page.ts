import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the MyPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-page',
  templateUrl: 'my-page.html'
})
export class MyPagePage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello MyPagePage Page');
  }

}
