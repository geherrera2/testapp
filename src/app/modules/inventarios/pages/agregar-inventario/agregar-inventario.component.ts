import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IonSlides, ModalController, NavController } from '@ionic/angular';
import { AgregarProductoComponent } from '../../components/agregar-producto/agregar-producto.component';
import { InventarioModel } from '../../models/inventario.model';
import { AlertService } from '@shared/services/alert/alert.service';
import { InventarioService } from '../../services/inventario/inventario.service';
import { Mensajes } from '@shared/enums/mensajes.enum';
import * as moment from 'moment';

@Component({
  selector: 'app-agregar-inventario',
  templateUrl: './agregar-inventario.component.html',
  styleUrls: ['./agregar-inventario.component.scss'],
})
export class AgregarInventarioComponent implements OnInit {

  title = 'Agregar inventario';
  formulario: FormGroup;
  mensajesFormulario: any = {};
  incluirInformacion: boolean;
  ionSlides: IonSlides;
  segmentSeletcted = 'detalle';
  detalleInventario: InventarioModel ;
  currentDate: any;

  slideOpts = {
    initialSlide: 0,
    speed: 0
  };

  constructor(
    public modalController: ModalController,
    private alertService: AlertService,
    private inventarioService: InventarioService,
    private navController: NavController,
  ) { }

  ngOnInit() {
    this.detalleInventario = new InventarioModel();
    this.formulario = this.crearFormulario();
    this.currentDate = moment(new Date()).format('YYYY-MM-DD');
  }

  private crearFormulario(): FormGroup {
    const formulario = new FormGroup({
      date: new FormControl(null, [Validators.required]),
      provider: new FormControl('', []),
      nit: new FormControl('', []),
      invoice_number: new FormControl('', []),
      inventory_products: new FormControl('', [Validators.required]),
    });

    this.mensajesFormulario = this.mensajesAgregar();
    return formulario;
  }

  mensajesAgregar() {
    return {
      date: [ {error: 'required', message: Mensajes.required}],
      provider: [ {error: 'required', message: Mensajes.required}],
      nit: [ {error: 'required', message: Mensajes.required}],
      invoice_number: [ {error: 'required', message: Mensajes.required}],
    };
  }

  changeIncluir(event){
    this.incluirInformacion = event.detail.checked;
    this.activarInformacion(this.incluirInformacion);
  }

  activarInformacion( estado: boolean ){
    if (estado){
      this.formulario.controls.provider.setValidators([Validators.required]);
      this.formulario.controls.nit.setValidators([Validators.required]);
      this.formulario.controls.invoice_number.setValidators([Validators.required]);
    } else {
      this.formulario.controls.provider.clearValidators();
      this.formulario.controls.nit.clearValidators();
      this.formulario.controls.invoice_number.clearValidators();
      this.formulario.controls.provider.updateValueAndValidity();
      this.formulario.controls.nit.updateValueAndValidity();
      this.formulario.controls.invoice_number.updateValueAndValidity();
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
      component: AgregarProductoComponent,
      cssClass: 'my-custom-class',
      componentProps: {
      }
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data.datos) {
      console.log(data.datos);
      
      this.detalleInventario.inventory_products.push(data.datos);
      this.formulario.controls.inventory_products.setValue(this.detalleInventario.inventory_products);
    }
  }

  submit(){
    if (this.formulario.invalid ) {
      if (this.formulario.controls.inventory_products.invalid) {
        this.alertService.presentAlert('Debe ingresar mínimo un producto.', [
          {
            text: 'Aceptar',
            handler: () => {
            }
          }
        ], 'Atención');
      }

      this.formulario.markAllAsTouched();
    } else {
      this.inventarioService.crearInventario(this.formulario.getRawValue()).subscribe( resp => {
        this.alertService.presentAlert('El registro de inventario se creó correctamente.', [
          {
            text: 'Aceptar',
            handler: () => {
              this.inventarioService.eventoAgregarInventario();
              this.navController.back();
            }
          }
        ], 'Registro creado');
      });
    }
  }


}
