import { Component, OnInit } from '@angular/core';
import { PopoverController, NavController } from '@ionic/angular';
import { SessionService } from '../../../session/services/session/session.service';
import { AlertService } from '../../services/alert/alert.service';

@Component({
  selector: 'app-popover-info',
  templateUrl: './popover-info.component.html',
  styleUrls: ['./popover-info.component.scss'],
})
export class PopoverInfoComponent implements OnInit {

  constructor(
    private popoverController: PopoverController,
    private sessionService: SessionService,
    private navCtrl: NavController,
    private alertService: AlertService
  ) { }

  ngOnInit() {}

  logout(){
    this.alertService.activarLoading(true);
    this.sessionService.clearSession().then( async () => {
      await this.popoverController.dismiss();
      this.alertService.activarLoading(false);
      this.navCtrl.navigateRoot(['auth/login']);
    });
  }

}
