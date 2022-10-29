import { Component } from '@angular/core';

import { NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SessionService } from './modules/session/services/session/session.service';
import { ParametricasService } from './modules/shared/services/parametricas/parametricas.service';
import { Router } from '@angular/router';

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
    private navCtrl: NavController,
    private sessionService: SessionService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {

      await this.sessionService.getToken().then( data => {
        if (data) {
          this.sessionService.token = data;
          this.router.navigate(['dashboard/home']);
          // this.navCtrl.navigateRoot('dashboard/home');
          // this.navCtrl.navigateRoot('dashboard/tabs/costos');
          // this.navCtrl.navigateRoot(['dashboard/tabs/costos/detalle-costo-actividad', { id: 1, name: 'Jornales' }]);
          // this.navCtrl.navigateRoot(['dashboard/tabs/fincas/lote/detalle/2', { id: 2, name: 'prueba' }]);
        } else {
          // this.navCtrl.navigateRoot('auth/login');
          this.router.navigate(['auth/login']);
        }
      });
      this.statusBar.styleLightContent();
      this.statusBar.backgroundColorByHexString('#008040');
      this.splashScreen.hide();
    });
  }
}
