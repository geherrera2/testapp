import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Geolocation } from '@ionic-native/geolocation/ngx';

import { ParametricasService } from '@shared/services/parametricas/parametricas.service';
import { FincasService } from '../../services/fincas/fincas.service';
import { AlertService } from '../../../shared/services/alert/alert.service';
import { ParametricasModel } from '../../../shared/models/parametricas.model';
import { Router } from '@angular/router';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-crear-finca-modal',
  templateUrl: './crear-finca-modal.component.html',
  styleUrls: ['./crear-finca-modal.component.scss'],
})
export class CrearFincaModalComponent implements OnInit {

  formulario: FormGroup;
  mensajesFormulario: any = {};
  parametricas: ParametricasModel;
  valueVillage: any;

  constructor(
    public modalController: ModalController,
    private router: Router,
    public parametricasService: ParametricasService,
    private fincasService: FincasService,
    private alertService: AlertService,
    private geolocation: Geolocation,
    private androidPermissions: AndroidPermissions
  ) { }

  ngOnInit() {
    this.parametricas = this.parametricasService.param;
    this.formulario = this.crearFormulario();
  }

  close(){
    this.modalController.dismiss({datos: null});
  }

  private crearFormulario(): FormGroup {
    const formulario = new FormGroup({
      cadastral_record: new FormControl( '', [] ),
      department_id: new FormControl( '', [  Validators.required ] ),
      municipality_id: new FormControl( '', [  Validators.required ] ),
      village_id: new FormControl( '', [  ] ),
      name: new FormControl( '', [  Validators.required ] ),
      ubication: new FormControl( '', [  Validators.required ] ),
      total_area: new FormControl( '', [  Validators.required ] ),
      holding_id: new FormControl( '', [  Validators.required ] ),
    });

    this.mensajesFormulario = this.fincasService.mensajesFinca();
    return formulario;
  }

  submit(){
    console.log(this.formulario.getRawValue());
    
    if (this.formulario.invalid ) {
      this.formulario.markAllAsTouched();
    } else {
      this.valueVillage = this.formulario.controls.village_id.value;
      const tempDpto = this.parametricas.departments.find( x => x.code == this.formulario.controls.department_id.value);
      const tempMpio = this.parametricas.municipalities.find( x => x.code == this.formulario.controls.municipality_id.value);
      this.formulario.controls.department_id.setValue(tempDpto.id);
      this.formulario.controls.municipality_id.setValue(tempMpio.id);
      this.formulario.controls.municipality_id.setValue(tempMpio.id);
      this.formulario.controls.village_id.setValue(this.valueVillage);

      this.alertService.activarLoading(true);
      this.fincasService.crearFinca(this.formulario.getRawValue())
        .subscribe( (data: any) => {
          this.fincasService.eventoActualizarFinca(true);
          this.alertService.activarLoading(false);
          this.alertService.presentAlert('La finca se creó correctamente. ¿desea crear un lote ?', [
            {
              text: 'Cancelar',
              handler: () => {
                this.modalController.dismiss({datos: data.data});
              }
            },
            {
              text: 'Aceptar',
              handler: () => {
                this.modalController.dismiss({datos: data.data});
                this.router.navigate(['dashboard/tabs/fincas/detalle', { id: data.data.id, name: data.data.name, redirect: 'crear' }]);
              }
            }
          ], 'Registro creado');
        }, error => {
          this.alertService.activarLoading(false);
          this.alertService.presentAlert('Se produjo un error en el registro de la finca', ['Aceptar']);
        });
    }
  }

  changeDpto( event: any ){
    console.log('changeDpto', event);
    
    this.formulario.controls.municipality_id.setValue(null);
    this.formulario.controls.village_id.setValue(null);
    this.parametricasService.getMunicipiosPorDpto(event)
      .subscribe( (data: any) => {
        this.parametricas.municipalities = data.data;
      });
  }

  changeMpio( event: any ){
    if ( event ){
      this.formulario.controls.village_id.setValue(null);
      this.parametricasService.getVeredasPorMpio(event)
        .subscribe( (data: any) => {
          this.parametricas.villages = data.data;
        });
    }
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
