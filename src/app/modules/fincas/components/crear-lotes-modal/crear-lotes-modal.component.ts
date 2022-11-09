import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AlertService } from '@shared/services/alert/alert.service';
import { LotesService } from '../../services/lotes/lotes.service';
import { ParametricasService } from '../../../shared/services/parametricas/parametricas.service';
import { ParametricasModel } from '../../../shared/models/parametricas.model';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-lotes-modal',
  templateUrl: './crear-lotes-modal.component.html',
  styleUrls: ['./crear-lotes-modal.component.scss'],
})
export class CrearLotesModalComponent implements OnInit {
  @Input() idFinca: string;
  @Input() areaDisponible: number;

  formulario: FormGroup;
  mensajesFormulario: any = {};
  parametricas: ParametricasModel;
  currentDate: any;

  constructor(
    private alertService: AlertService,
    public modalController: ModalController,
    private lotesService: LotesService,
    private parametricasService: ParametricasService,
    private geolocation: Geolocation,
    private androidPermissions: AndroidPermissions,
    private router: Router
  ) { }

  ngOnInit() {
    this.parametricas = this.parametricasService.param;
    this.formulario = this.crearFormulario();
    this.currentDate = moment(new Date()).format('YYYY-MM-DD');
  }

  private crearFormulario(): FormGroup {
    const formulario = this.lotesService.createrFormLot(this.areaDisponible);

    this.mensajesFormulario = this.lotesService.mensajesLote();
    return formulario;
  }

  submit(){
    if (this.formulario.invalid ) {
      this.formulario.markAllAsTouched();
    } else {
      this.alertService.activarLoading(true);
      this.lotesService.crearLote(this.formulario.getRawValue())
        .subscribe( (data: any) => {
          this.alertService.activarLoading(false);
          this.alertService.presentAlert('El lote se creó correctamente. ¿desea crear un análisis ?', [
            // {
            //   text: 'Aceptar',
            //   handler: () => {
            //     this.modalController.dismiss({datos: data.data});
            //   }
            // }
            {
              text: 'Cancelar',
              handler: () => {
                this.modalController.dismiss({datos: data.data});
              }
            },
            {
              text: 'Aceptar',
              handler: () => {

                const temp = this.areaDisponible - parseInt(this.formulario.controls.total_area.value);
                this.modalController.dismiss({datos: data.data});
                this.router.navigate([
                  'dashboard/tabs/fincas/lote/detalle/' + data.data.id,
                  { id: data.data.id, name: data.data.name, areaDisponible: temp, redirect: 'crear' }
                ]);
              }
            }
          ], 'Registro creado');
        }, error => {
          this.alertService.activarLoading(false);
          this.alertService.presentAlert('Se produjo un error en el registro de el lote', ['Aceptar']);
        });
    }
  }

  close(){
    this.modalController.dismiss({datos: null});
  }

  getGps(){
    this.androidPermissions.checkPermission(
          this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
      .then( data => {
        if ( data.hasPermission ){
          this.getUbicacion();
        } else {
          this.androidPermissions.requestPermissions(
            [
              this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION,
              this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION
            ]
            ).then( respGps => {
              if ( respGps.hasPermission ){
                this.getUbicacion();
              } else {
                this.errorGps();
              }
            });
        }
      }, err => {
        this.errorGps(err);
      }
    );
  }

  private errorGps(error?: any) {
    this.alertService.activarLoading(false);
    let msg = '';
    if (error?.code === 2) {
      msg = 'la aplicación no tiene suficientes permisos de geolocalización';
    } else {
      msg = 'No fue posible capturar la geolocalización';
    }
    this.formulario.controls.ubication.setValue(`--`);
    this.alertService.presentAlert(msg, ['Aceptar']);
  }

  private getUbicacion() {
    this.alertService.activarLoading(true);
    this.geolocation.getCurrentPosition().then((resp) => {
      this.alertService.activarLoading(false);
      this.formulario.controls.ubication.setValue(`${resp.coords.latitude}, ${resp.coords.longitude}`);
    }).catch((error) => {
      this.errorGps(error);
    });
  }

}
