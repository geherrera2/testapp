import { Component, OnDestroy, OnInit } from '@angular/core';
import { FincasService } from '../../services/fincas/fincas.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CrearFincaModalComponent } from '../../components/crear-finca-modal/crear-finca-modal.component';
import { ParametricasService } from '../../../shared/services/parametricas/parametricas.service';
import { interval, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { AlertService } from '../../../shared/services/alert/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit , OnDestroy{

  public destroy$: Subject<boolean> = new Subject<boolean>();
  listadoFincas: any[] = [];
  modal: any;
  textoBuscar = '';

  constructor(
    public fincasService: FincasService,
    private router: Router,
    public modalController: ModalController,
    private parametricasService: ParametricasService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.alertService.activarLoading(true);
    this.fincasService.getFincas().subscribe( resp => {
      this.alertService.activarLoading(false);
      this.listadoFincas = resp;
      interval(100).pipe(take(1)).subscribe( data =>  {
        this.parametricasService.getParametricasFincas();
      });
    }, err => {
      this.alertService.activarLoading(false);
    });

    this.fincasService.updateFincas$
    .pipe(
      takeUntil(this.destroy$),
    )
    .subscribe( data => {
      this.fincasService.getFincas().subscribe( resp => {
        this.listadoFincas = resp;
      });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  openDetail(data: any){
    this.router.navigate(['dashboard/tabs/fincas/detalle', { id: data.id, name: data.name }]);
  }

  async presentModal() {
    this.modal = await this.modalController.create({
      component: CrearFincaModalComponent,
      cssClass: 'my-custom-class'
    });

    await this.modal.present();

    // const { data } = await this.modal.onWillDismiss();
    // if (data.datos) {
    //   this.listadoFincas.push({id: data.datos.id, name: data.datos.name});
    // }
  }

  onSearchChange( event ) {
    this.textoBuscar = event.detail.value;
  }

  eliminar(item){
    this.alertService.presentAlert('¿Está seguro de eliminar la finca?', [
      {
        text: 'Cancelar',
        handler: () => {

        }
      },
      {
        text: 'Aceptar',
        handler: () => {
          this.alertService.activarLoading(true);
          this.fincasService.eliminarFinca(item.id).subscribe( data => {
            this.alertService.activarLoading(false);
            this.fincasService.eventoActualizarFinca(null);
            this.alertService.presentToast('La finca fue eliminada.');
          }, err =>  {
            
            this.alertService.activarLoading(false);
          });
        }
      }
    ], 'Atención');
  }


}
