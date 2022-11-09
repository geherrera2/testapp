import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LotesService } from '../../services/lotes/lotes.service';
import { IonSlides, ModalController, NavController } from '@ionic/angular';
import { CrearAnalisisModalComponent } from '../../components/crear-analisis-modal/crear-analisis-modal.component';
import { ParametricasService } from '../../../shared/services/parametricas/parametricas.service';
import { ParametricasModel } from '../../../shared/models/parametricas.model';
import { AlertService } from '../../../shared/services/alert/alert.service';
import { AnalisisService } from '../../services/analisis/analisis.service';
import { LoteModel } from '../../models/lotes.model';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { takeUntil } from 'rxjs/operators';
import { Subject, interval } from 'rxjs';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import * as moment from 'moment';

@Component({
  selector: 'app-detalle-lote',
  templateUrl: './detalle-lote.component.html',
  styleUrls: ['./detalle-lote.component.scss'],
})
export class DetalleLoteComponent implements OnInit, OnDestroy {

  formulario: FormGroup;
  mensajesFormulario: any = {};
  title = '';
  id = '';
  areaDisponible: number = 0;
  valueBrightness;
  segmentSeletcted = 'detalle';
  ionSlides: IonSlides;
  detalleLote: LoteModel;
  modal: any;
  currentDate: any;
  redirect: string;

  public destroy$: Subject<boolean> = new Subject<boolean>();
  public destroyIonSlides$: Subject<boolean> = new Subject<boolean>();

  slideOpts = {
    initialSlide: 0,
    speed: 0
  };

  parametricas: ParametricasModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lotesService: LotesService,
    private analisisService: AnalisisService,
    private parametricasService: ParametricasService,
    private alertService: AlertService,
    public modalController: ModalController,
    private geolocation: Geolocation,
    private navController: NavController,
    private androidPermissions: AndroidPermissions
  ) {
      this.route.params.subscribe(params => {
        this.title  = params.name;
        this.id  = params.id;
        this.areaDisponible = parseInt(params.areaDisponible);
        this.redirect  = params.redirect;
      });

  }

  ngOnInit() {

    if (this.redirect && this.redirect === 'crear'){
      interval(200).pipe((takeUntil(this.destroyIonSlides$))).subscribe(data => {
        if (this.ionSlides){
          this.segmentSeletcted  = 'lotes';
          this.ionSlides.slideNext(100);
          this.destroyIonSlides$.next(true);
        }
      });
    }
    
    this.parametricas = this.parametricasService.param;
    this.formulario = this.crearFormulario();
    this.lotesService.getDetalleLote(this.id).subscribe( data => {
      this.detalleLote = data;
      this.areaDisponible = this.areaDisponible + parseInt(data.total_area);
      this.formulario.controls.total_area.setValidators([Validators.required, this.lotesService.validarAreaLote(this.areaDisponible)]);
      this.formulario.controls.total_area.updateValueAndValidity();
      this.setFormulario(this.detalleLote);
      this.getAnalisis();
    });

    this.analisisService.updateAnalisis$.pipe(takeUntil(this.destroy$)).subscribe( data => {
      this.getAnalisis();
    });
    this.currentDate = moment(new Date()).format('YYYY-MM-DD');
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    this.destroyIonSlides$.unsubscribe();
  }

  private getAnalisis() {
    this.analisisService.getAnalisisPorLote(this.detalleLote.id).subscribe((lotes: any) => {
      this.detalleLote.analisis = lotes;
    }, err => {
      this.alertService.activarLoading(false);
    });
  }

  private crearFormulario(): FormGroup {
    const formulario = this.lotesService.createrFormLot(this.areaDisponible);

    this.mensajesFormulario = this.lotesService.mensajesLote();
    return formulario;
  }

  setFormulario(data){
    this.formulario.controls.id.setValue(data?.id);
    this.formulario.controls.name.setValue(data?.name);
    this.formulario.controls.total_area.setValue(data?.total_area);
    this.formulario.controls.ubication.setValue(data?.ubication);
    this.formulario.controls.above_sea_level.setValue(data?.above_sea_level);
    this.formulario.controls.description.setValue(data?.description);
    this.formulario.controls.varietie_coffee_id.setValue(data?.varietie_coffee_id);
    this.formulario.controls.renewal_id.setValue(data?.renewal_id);
    this.formulario.controls.type_renewal_id.setValue(data?.type_renewal_id);
    this.formulario.controls.date_renewal.setValue(data?.date_renewal);
    this.formulario.controls.age.setValue(data?.age);
    this.formulario.controls.brightness_id.setValue(data?.brightness_id);
    this.formulario.controls.range_brightness.setValue(data?.range_brightness);
    this.formulario.controls.type_somber_id.setValue(data?.type_somber_id);
    this.formulario.controls.stroke_id.setValue(data?.stroke_id);
    this.formulario.controls.distance_sites.setValue(data?.distance_sites);
    this.formulario.controls.distance_furrow.setValue(data?.distance_furrow);
    this.formulario.controls.stems_sites.setValue(data?.stems_sites);
    this.formulario.controls.density_hectares.setValue(data?.density_hectares);
    this.formulario.controls.sites_crop.setValue(data?.sites_crop);
    this.formulario.controls.number_plants.setValue(data?.number_plants);
    this.formulario.controls.farm_id.setValue(data?.farm_id);
    this.valueBrightness = data?.brightness_id;
  }

  submit(){
    if (this.formulario.invalid ) {
      this.formulario.markAllAsTouched();
    } else {
      this.alertService.activarLoading(true);
      this.lotesService.actualizarLote(this.formulario.getRawValue())
        .subscribe( (data: any) => {
          this.lotesService.eventoActualizarLote(data.data);
          this.alertService.activarLoading(false);
          this.alertService.presentAlert('La información se actualizó correctamente', [
            {
              text: 'Aceptar',
              handler: () => {

              }
            }
          ], 'Registro actualizado');
        }, error => {
          this.alertService.activarLoading(false);
          this.alertService.presentAlert('Se produjo un error en el registro de la finca', ['Aceptar']);
        });
    }
  }

  segmentChanged(ev: any) {
    this.segmentSeletcted = ev.detail.value;
    if ( this.segmentSeletcted  === 'detalle' ) {
      this.ionSlides.slidePrev(100);
    } else {
      this.ionSlides.slideNext(100);
    }
  }

  slideDidChange( slides: IonSlides){
    this.ionSlides = slides;
    this.ionSlides.getActiveIndex().then( data => {
      if (data === 0){
        this.segmentSeletcted = 'detalle';
      } else {
        this.segmentSeletcted = 'lotes';
      }
    });
  }

  slidesDidLoad( slides: IonSlides){
    this.ionSlides = slides;
  }

  detalleAnalisis(item){
    this.analisisService.detalleAnalisis = item;
    this.router.navigate(['dashboard/tabs/fincas/lote/analisis/detalle/' + item.id]);
  }

  async presentModal() {
    this.modal = await this.modalController.create({
      component: CrearAnalisisModalComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        idLote: this.id,
      }
    });
    await this.modal.present();

    const { data } = await this.modal.onWillDismiss();
    if (data?.datos) {
      this.detalleLote.analisis.push({id: data.datos.id, analysis_date: data.datos.analysis_date});
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

  eliminar(){
    this.alertService.presentAlert('¿Está seguro de eliminar el lote?', [
      {
        text: 'Cancelar',
        handler: () => {

        }
      },
      {
        text: 'Aceptar',
        handler: () => {
          this.alertService.activarLoading(true);
          this.lotesService.eliminarLote(this.id).subscribe( data => {
            this.alertService.activarLoading(false);
            this.lotesService.eventoActualizarLote(null);
            this.navController.back();
            this.alertService.presentToast('El lote fue eliminado.');
          }, err =>  {
            this.alertService.activarLoading(false);
          });
        }
      }
    ], 'Atención');
  }

}
