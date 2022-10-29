import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ParametricasModel } from '@shared/models/parametricas.model';
import { ParametricasService } from '@shared/services/parametricas/parametricas.service';
import { AlertService } from '@shared/services/alert/alert.service';
import { InventarioService } from '../../services/inventario/inventario.service';
import { ProductosInventarioModel } from '../../models/inventario.model';
import { Mensajes } from '@shared/enums/mensajes.enum';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.scss'],
})
export class AgregarProductoComponent implements OnInit {

  formulario: FormGroup;
  mensajesFormulario: any = {};
  parametricas: ParametricasModel;
  listaProductos: any[] = [];
  nombreProducto: string;
  nombreTipoProducto: string;

  constructor(
    public modalController: ModalController,
    public parametricasService: ParametricasService,
    private inventarioService: InventarioService,
  ) { }

  ngOnInit() {
    this.parametricas = this.parametricasService.param;
    this.formulario = this.crearFormulario();
  }

  private crearFormulario(): FormGroup {
    const formulario = new FormGroup({

      productTypes: new FormControl( '', [  Validators.required ] ),
      productTypesName: new FormControl( '', [] ),
      product_id: new FormControl( '', [  Validators.required ] ),
      amount: new FormControl( '', [  Validators.required ] ),
      unit_cost: new FormControl( '', [  Validators.required ] ),
      total_cost: new FormControl( '', [  Validators.required ] ),
    });
    this.crearMensajes();
    return formulario;
  }

  crearMensajes(): void {
    this.mensajesFormulario =  {
      productTypes : [{ error: 'required', message: Mensajes.required}],
      product_id : [{ error: 'required', message: Mensajes.required}],
      amount : [{ error: 'required', message: Mensajes.required}],
      unit_cost : [{ error: 'required', message: Mensajes.required}],
      total_cost : [{ error: 'required', message: Mensajes.required}],
    };
  }

  close(){
    this.modalController.dismiss({datos: null});
  }

  changeProductTypes(event){
    const temp = this.parametricas.productTypes.find( x => x.id == event);
    this.nombreTipoProducto = temp.name;
    this.inventarioService.getProductosPorTipo(event).subscribe( ( resp: any ) => this.listaProductos = resp );
  }

  changeProduct(event: number){
    const temp = this.listaProductos.find( x => x.id == event);
    this.nombreProducto = temp.name;
  }

  blurCantidad(){
    const temp = this.formulario.controls.amount.value * this.formulario.controls.unit_cost.value;
    this.formulario.controls.total_cost.setValue(temp);

  }


  submit(){
    if (this.formulario.invalid ) {
      this.formulario.markAllAsTouched();
    } else {
      const temp  = new ProductosInventarioModel(this.formulario.getRawValue());
      temp.name = this.nombreProducto;
      temp.product_type_name = this.nombreTipoProducto;

      this.modalController.dismiss({datos: temp});
    }


  }


}
