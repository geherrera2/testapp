import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { map } from 'rxjs/operators';
import { ParametricasModel } from '../../models/parametricas.model';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { AlertService } from '../alert/alert.service';
import { FormGroup } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class ParametricasService {
  param: ParametricasModel;

  constructor(
    private httpService: HttpService,private androidPermissions: AndroidPermissions,private alertService: AlertService,private geolocation: Geolocation,
  ) {
    this.param = new ParametricasModel();
   }

  getTipoDocumento = () => this.httpService.get('api/document-types');

  getDepartamentos = () => this.httpService.get('api/departments');

  getMunicipiosPorDpto = ( idDpto: any ) => this.httpService.get('api/municipalities/' + idDpto );

  getVeredasPorMpio = ( idMpio: any ) => this.httpService.get('api/villages/' + idMpio );

  getTenencias = () => this.httpService.get('api/holdings');

  getParamBy = ( parametrica: string ) => this.httpService.get('api/' + parametrica )
    .pipe(
      map( resp => {
        return resp;
      })
    )

  getParametricasFincas() {
    this.getParamBy('departments').subscribe( (data: any ) => this.param.departments = data.data );
    this.getParamBy('holdings').subscribe( (data: any ) => this.param.holdings = data.data );
    this.getParamBy('varieties-coffee').subscribe( (data: any ) => this.param.varietiesCoffee = data.data );
    this.getParamBy('renewals').subscribe( (data: any ) => this.param.renewals = data.data );
    this.getParamBy('type-renewals').subscribe( (data: any ) => this.param.typeRenewals = data.data );
    this.getParamBy('type-sombers').subscribe( (data: any ) => this.param.typeSombers = data.data );
    this.getParamBy('strokes').subscribe( (data: any ) => this.param.strokes = data.data );
    this.getParamBy('brightnesses').subscribe( (data: any ) => this.param.brightnesses = data.data );
  }

  getParametricasInventarios() {
    this.getParamBy('unit-measurements').subscribe( (data: any ) => this.param.units = data.data );
    this.getParamBy('product-types').subscribe( (data: any ) => this.param.productTypes = data.data );
  }

  getParametricasCostos() {
    this.getParamBy('product-types').subscribe( (data: any ) => this.param.productTypes = data.data );
    this.getParamBy('type-activity').subscribe( (data: any ) => this.param.typeActivity = data.data );
    this.getParamBy('stage').subscribe( (data: any ) => this.param.stages = data.data );
    this.getParamBy('type-work').subscribe( (data: any ) => this.param.typeWork = data.data );
    this.getParamBy('type-category').subscribe( (data: any ) => this.param.typeCategory = data.data );
  }

  getGps(formulario:FormGroup){
    this.androidPermissions.checkPermission(
          this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
      .then( data => {
        if ( data.hasPermission ){
          this.getUbicacion(formulario);
        } else {
          this.androidPermissions.requestPermissions(
            [
              this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION,
              this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION
            ]
            ).then( respGps => {
              if ( respGps.hasPermission ){
                this.getUbicacion(formulario);
              } else {
                this.errorGps();
              }
            });
        }
      }, err => {
        this.errorGps(err, formulario);
      }
    );
  }

  private getUbicacion(formulario:FormGroup) {
    this.alertService.activarLoading(true);
    this.geolocation.getCurrentPosition().then((resp) => {
      this.alertService.activarLoading(false);
      formulario.controls.ubication.setValue(`${resp.coords.latitude}, ${resp.coords.longitude}`);
    }).catch((error) => {
      this.errorGps(error, formulario);
    });
  }

  private errorGps(error?: any, form?:any) {
    this.alertService.activarLoading(false);
    let msg = '';
    if (error?.code === 2) {
      msg = 'la aplicación no tiene suficientes permisos de geolocalización';
    } else {
      msg = 'No fue posible capturar la geolocalización';
    }
    form.controls.ubication.setValue(`--`);
    this.alertService.presentAlert(msg, ['Aceptar']);
  }

}
