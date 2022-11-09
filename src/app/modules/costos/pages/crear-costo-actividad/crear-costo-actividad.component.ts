import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ParametricasModel } from '@shared/models/parametricas.model';
import { FincasService } from '../../../fincas/services/fincas/fincas.service';
import { LotesService } from '../../../fincas/services/lotes/lotes.service';
import { IonSlides, ModalController, NavController, Platform, ViewDidEnter, ViewWillLeave } from '@ionic/angular';
import { CrearInsumoComponent } from '../../components/crear-insumo/crear-insumo.component';
import { ParametricasService } from '../../../shared/services/parametricas/parametricas.service';
import * as moment from 'moment';
import { AlertService } from '../../../shared/services/alert/alert.service';
import { CostosService } from '../../services/costos.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-crear-costo-actividad',
  templateUrl: './crear-costo-actividad.component.html',
  styleUrls: ['./crear-costo-actividad.component.scss'],
})
export class CrearCostoActividadComponent implements OnInit , ViewDidEnter, ViewWillLeave, OnDestroy{
  backButtonSub: Subscription;
  formulario: FormGroup;
  mensajesFormulario: any = {};
  parametricas: ParametricasModel;
  listadoFincas: any[] = [];
  listadoLotesFinca: any[] = [];
  detalleCosto: any = {
    insumos: []
  };
  fecha: string;
  estadoFormulario = false;
  public destroy$: Subject<boolean> = new Subject<boolean>();

  segmentSeletcted = 'detalle';
  ionSlides: IonSlides;
  slideOpts = {
    initialSlide: 0,
    speed: 0
  };

  constructor(
    private fincasService: FincasService,
    private lotesService: LotesService,
    private modalController: ModalController,
    private alertService: AlertService,
    private costosService: CostosService,
    private parametricasService: ParametricasService,
    private navController: NavController,
    private platform: Platform
  ) {
  }

  onBack(){
    if (this.estadoFormulario){
      this.alertService.presentAlert('Hay información pendiente por guardar, si continua perdera la información. ¿ Desea continuar? ', [
        {
          text: 'Cancelar',
          handler: () => {
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.navController.back();
          }
        }
      ], 'Atención');
    } else {
      this.navController.back();
    }
  }


  ionViewDidEnter() {
    console.log("codigo")
  }

  ionViewWillLeave() {
    this.backButtonSub.unsubscribe();
  }

  ngOnInit() {
    this.fecha = moment().format('DD/MM/YYYY');
    this.parametricas = this.parametricasService.param;
    this.formulario = this.crearFormulario();
    this.cargaParametricos();

    this.formulario.valueChanges
    .pipe(
      takeUntil(this.destroy$),
    )
    .subscribe( data => {
      this.estadoFormulario = true;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  cargaParametricos() {
    this.fincasService.getFincas().subscribe( resp => {
      this.listadoFincas = resp;
      // this.parametricasService.getParametricasFincas();
    });
  }

  private crearFormulario(): FormGroup {
    const formulario = new FormGroup({
      type_cost_id: new FormControl('1'),
      type_activity_id: new FormControl( '', [Validators.required] ),
      farm_id: new FormControl( '', [Validators.required] ),
      lot_id: new FormControl( '', [Validators.required] ),
      stage_id: new FormControl( '', [Validators.required] ),
      type_work_id: new FormControl( '', [Validators.required] ),
      amount: new FormControl( '', [Validators.required] ),
      unit_cost: new FormControl( '', [Validators.required] ),
      total_cost: new FormControl( '', [] ),
      supplies: new FormControl( '', [Validators.required] ),
    });

    return formulario;
  }

  changeFinca(event){
    this.lotesService.getLotes(event).subscribe((lotes: any) => {
      this.listadoLotesFinca = lotes;
    });
  }

  submit(){
    if (this.formulario.invalid ) {
      if (this.formulario.controls.supplies.invalid) {
        this.alertService.presentAlert('Debe ingresar mínimo un insumo.', [
          {
            text: 'Aceptar',
            handler: () => {
            }
          }
        ], 'Atención');
      }

      this.formulario.markAllAsTouched();
    } else {
      this.alertService.activarLoading(true);
      this.costosService.crearCostoActividad(this.formulario.getRawValue())
        .subscribe( (data: any) => {
          this.alertService.activarLoading(false);
          this.alertService.presentAlert('La información se creó correctamente.', [
            {
              text: 'Aceptar',
              handler: () => {
                this.costosService.eventoActualizarCosto(true);
                this.navController.back();
              }
            }
          ], 'Registro creado');
        }, error => {
          this.alertService.activarLoading(false);
          this.alertService.presentAlert('Se produjo un error en el registro de la información', ['Aceptar']);
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

  async presentModal() {
    const modal = await this.modalController.create({
      component: CrearInsumoComponent,
      cssClass: 'my-custom-class',
      componentProps: {
      }
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data.datos) {
      this.detalleCosto.insumos.push(data.datos);
      this.formulario.controls.supplies.setValue(this.detalleCosto.insumos);
    }
  }

  blurCantidad(){
    const temp = this.formulario.controls.amount.value * this.formulario.controls.unit_cost.value;
    this.formulario.controls.total_cost.setValue(temp);
  }

}
