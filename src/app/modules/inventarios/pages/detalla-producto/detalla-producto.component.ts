import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../shared/services/alert/alert.service';
import { ActivatedRoute } from '@angular/router';
import { InventarioService } from '../../services/inventario/inventario.service';
import { ParametricasService } from '@shared/services/parametricas/parametricas.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ParametricasModel } from '@shared/models/parametricas.model';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-detalla-producto',
  templateUrl: './detalla-producto.component.html',
  styleUrls: ['./detalla-producto.component.scss'],
})
export class DetallaProductoComponent implements OnInit {

  ionSlides: IonSlides;
  title = '';
  id = '';
  formulario: FormGroup;
  mensajesFormulario: any = {};
  parametricas: ParametricasModel;
  textoBuscar = '';
  listaHistorial: any[] = [];

  segmentSeletcted = 'detalle';

  slideOpts = {
    initialSlide: 0,
    speed: 0
  };

  constructor(
    private alertService: AlertService,
    private route: ActivatedRoute,
    public parametricasService: ParametricasService,
    private inventarioService: InventarioService
  ) {
    this.route.params.subscribe(params => {
      this.title  = params.name;
      this.id  = params.id;

    });
   }

   ngOnInit() {
    this.parametricas = this.parametricasService.param;
    this.formulario = this.crearFormulario();
    this.alertService.activarLoading(true);

    this.inventarioService.getDetalleProducto(this.id).subscribe( (data: any) => {
console.log(data);

      this.formulario.controls.name.setValue(data?.name);
      this.formulario.controls.unit_measurement.setValue(data?.unit_measurement_name);
      this.formulario.controls.product_type.setValue(data?.product_type_name);
      this.cargarHistorialInventario();
    }, err => {
      this.alertService.activarLoading(false);
    });

  }

  private cargarHistorialInventario() {
    this.inventarioService.getInventarioProductosHistory(this.id).subscribe((data: any[]) => {
      this.alertService.activarLoading(false);
      if (data && data.length > 0) {
        this.listaHistorial = data;
      }

    }, error => {
      this.alertService.activarLoading(false);
    });
  }

  private crearFormulario(): FormGroup {
    const formulario = new FormGroup({
      name: new FormControl( '', [ Validators.required] ),
      unit_measurement: new FormControl( '', [ Validators.required] ),
      product_type: new FormControl( '', [ Validators.required] ),
    });

    // this.mensajesFormulario = this.fincasService.mensajesFinca();
    return formulario;
  }

  submit(){

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

}
