import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { interval, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private loadingObservable = new Subject<any>();
  private loadingObservable$ = this.loadingObservable.asObservable();
  private loading: any;
  public destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public alertController: AlertController,
    public loadingController: LoadingController,
    public toastController: ToastController
  ) {
    this.loadingObservable$.subscribe( data => {
      if ( data ) {
        this.presentLoading();
      } else {
        interval(200).pipe(takeUntil(this.destroy$)).subscribe( data => {
          if (this.loading) {
            this.destroy$.next(true);
            this.closeLoading();
          }
        });
      }
    });
   }

  async presentAlert( message , buttons, header  = 'Atención') {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header,
      subHeader: '',
      message,
      buttons
    });

    await alert.present();
  }

  async presentAlertConfirm(message , eventCancelar, eventAceptar, header  = 'Atención') {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header,
      message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            eventCancelar()
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            eventAceptar();
          }
        }
      ]
    });

    await alert.present();
  }

  activarLoading = ( estado: boolean ) => this.loadingObservable.next(estado);

  private async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Por favor espera...',
    });
    await this.loading.present();
  }

  private closeLoading(){
    this.loading.dismiss();
    
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
