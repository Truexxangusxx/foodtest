import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RegistroPage } from '../pages/registro/registro';
import { PerfilPage } from '../pages/perfil/perfil';
import { GustosPage } from '../pages/gustos/gustos';
import { MapaPage } from '../pages/mapa/mapa';
import { UserService } from '../providers/user-service';
import { Storage } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegistroPage,
    PerfilPage,
    GustosPage,
    MapaPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegistroPage,
    PerfilPage,
    GustosPage,
    MapaPage,
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, UserService, Storage]
})
export class AppModule {}
