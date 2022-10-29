import { Injectable } from '@angular/core';
import { PopoverController } from '@ionic/angular';

import { PopoverInfoComponent } from '../../components/popover-info/popover-info.component';

@Injectable({
  providedIn: 'root'
})
export class PopoverService {

  popover: any;

  constructor(
    public popoverController: PopoverController
  ) { }

  async presentPopover(ev: any) {
    this.popover = await this.popoverController.create({
      component: PopoverInfoComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await this.popover.present();
  }
}
