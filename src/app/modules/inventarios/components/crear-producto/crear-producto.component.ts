import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ParametricasModel } from '@shared/models/parametricas.model';
import { ModalController } from '@ionic/angular';
import { ParametricasService } from '@shared/services/parametricas/parametricas.service';
import { AlertService } from '@shared/services/alert/alert.service';
import { InventarioService } from '../../services/inventario/inventario.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss'],
})
export class CrearProductoComponent implements OnInit {

  formulario: FormGroup;
  mensajesFormulario: any = {};
  parametricas: ParametricasModel;

  constructor(
    public modalController: ModalController,
    public parametricasService: ParametricasService,
    private alertService: AlertService,
    private inventarioService: InventarioService
  ) { }

  ngOnInit() {
    this.parametricas = this.parametricasService.param;
    this.formulario = this.crearFormulario();
  }

  private crearFormulario(): FormGroup {
    const formulario = new FormGroup({
      name: new FormControl( '', [ Validators.required] ),
      unit_measurement_id: new FormControl( '', [ Validators.required] ),
      product_type_id: new FormControl( '', [ Validators.required] ),
    });

    // this.mensajesFormulario = this.fincasService.mensajesFinca();
    return formulario;
  }

  close(){
    this.modalController.dismiss({datos: null});
  }

  changeProductTypes(event){
    console.log(event);
  }
  changeUnit(event){
    console.log(event);
  }

  submit(){
    if (this.formulario.invalid ) {
      this.formulario.markAllAsTouched();
    } else {
      this.alertService.activarLoading(true);
      this.inventarioService.crearProducto(this.formulario.getRawValue())
        .subscribe( (data: any) => {
          this.alertService.activarLoading(false);
          this.alertService.presentAlert('El producto se creó correctamente', [
            // {
            //   text: 'Cancelar',
            //   handler: () => {
            //     this.modalController.dismiss({datos: data.data});
            //   }
            // },
            {
              text: 'Aceptar',
              handler: () => {
                this.modalController.dismiss({datos: data.data});
              }
            }
          ], 'Registro creado');
        }, error => {
          this.alertService.activarLoading(false);
          this.alertService.presentAlert('Se produjo un error en el registro de la finca', ['Aceptar']);
        });
    }
  }

}
