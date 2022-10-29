import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ParametricasModel } from '@shared/models/parametricas.model';
import { ModalController } from '@ionic/angular';
import { ParametricasService } from '@shared/services/parametricas/parametricas.service';
import { AlertService } from '@shared/services/alert/alert.service';
import { InventarioService } from '../../../inventarios/services/inventario/inventario.service';
import { Mensajes } from '@shared/enums/mensajes.enum';

@Component({
  selector: 'app-crear-insumo',
  templateUrl: './crear-insumo.component.html',
  styleUrls: ['./crear-insumo.component.scss'],
})
export class CrearInsumoComponent implements OnInit {

  formulario: FormGroup;
  mensajesFormulario: any = {};
  parametricas: ParametricasModel;
  listaProductos: any[] = [];
  productoActual: any;

  constructor(
    public modalController: ModalController,
    public parametricasService: ParametricasService,
    private alertService: AlertService,
    private inventarioService: InventarioService
  ) { }

  ngOnInit() {
    this.parametricas = this.parametricasService.param;
    this.formulario = this.crearFormulario();

    this.parametricasService.getParamBy('product-types').subscribe( (data: any ) => this.parametricas.productTypes = data.data );
  }

  private crearFormulario(): FormGroup {
    const formulario = new FormGroup({
      // tslint:disable-next-line: radix
      amount: new FormControl( '', [ Validators.required, this.validarCantidadDisponible(), this.valorCero()] ),
      product_id: new FormControl( '', [ Validators.required] ),
      product_name: new FormControl( '', [] ),
      product_type_id: new FormControl( '', [ Validators.required] ),
      product_type_name: new FormControl( '', [] ),
    });

    this.mensajesFormulario = this.crearMensajesFormulario();
    return formulario;
  }

  crearMensajesFormulario() {
    return {
      amount: [
        {error: 'required', message: Mensajes.required},
        {error: 'cantidadDisponible', message: 'El valor no puede ser mayor  al disponible en inventario.'},
        {error: 'valorCero', message: 'El valor mínimo es 1.'}
      ],
      product_id: [ {error: 'required', message: Mensajes.required}],
      product_name: [ {error: 'required', message: Mensajes.required}],
      product_type_id: [ {error: 'required', message: Mensajes.required}],
      product_type_name: [ {error: 'required', message: Mensajes.required}],
      cadastral_record : [ {error: 'required', message: Mensajes.required}],
    };
  }

  close(){
    this.modalController.dismiss({datos: null});
  }

  submit(){
    if (this.formulario.invalid ) {
      this.formulario.markAllAsTouched();
    } else {
      const tempProduct = this.listaProductos.find(x => x.id = this.formulario.controls.product_id.value);
      this.formulario.controls.product_name.setValue(tempProduct.name);
      const temp = this.formulario.getRawValue();
      this.modalController.dismiss({datos: temp});
    }
  }

  changeProductTypes(event){
    const temp = this.parametricas.productTypes.find( x => x.id == event );
    this.formulario.controls.product_type_name.setValue(temp.name);
    this.formulario.controls.product_id.setValue(null);
    this.inventarioService.getProductosPorTipo(event).subscribe( ( resp: any ) => this.listaProductos = resp );
  }

  changeProduct(event){
    this.productoActual = this.listaProductos.find(x => x.id == event);
    console.log(this.productoActual);
  }

  validarCantidadDisponible(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const tempValue = control.value === '' ? 0 : parseInt(control.value);
      const temp = tempValue <= this.productoActual?.total_amount ? false : true ;
      return temp ? {cantidadDisponible: true } : null;
    };
  }

  valorCero(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const tempValue = control.value === '' ? 0 : parseInt(control.value);
      const temp = tempValue > 0 ? false : true ;
      return temp ? {valorCero: true } : null;
    };
  }

}
