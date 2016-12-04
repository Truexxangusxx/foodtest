import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RegistroPage } from '../pages/registro/registro';
import { PerfilPage } from '../pages/perfil/perfil';
import { UserService } from '../providers/user-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegistroPage,
    PerfilPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegistroPage,
    PerfilPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, UserService]
})
export class AppModule {}
