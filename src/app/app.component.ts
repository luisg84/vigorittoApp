import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { FCM, NotificationData } from '@ionic-native/fcm/ngx';
import { from } from 'rxjs';
import { VigorittoAppService } from '../app/servicios/vigoritto-app.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcm:FCM,
    private vigorittoAppService:VigorittoAppService,
  ) {
    this.initializeApp(
      
    );
  }
  

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.fcm.getToken().then(
        (token: string) =>{
          this.sendTokend(token);
          console.log('tockend del dispositivo' + token);
        }
      ).catch(error => {
        console.log('no se genero el tockend'+ error);
      });
      
      this.fcm.onTokenRefresh().subscribe((token:string)=>{
        console.log('Actualizacion del tockend' + token);
      });

      this.fcm.onNotification().subscribe(data => {
          if(data.wasTapped){
            //ocurre cuando la aplicación se encuentra en segundo plano
            console.log('la aplicacion se encuentra en segundo plano' + JSON.stringify(data));
          } else{
            //ocurre cuando la aplicacion esta en primer plano
            console.log('la aplicacion se encuentra en primer plano' + JSON.stringify(data));
          }
      },error => {
        console.log('error '+ error);
      });
  

    });
  }

  async sendTokend(token){
      await this.vigorittoAppService.sendTokend(token).subscribe(resp=>{
        console.log(resp);
      })
  }
}
