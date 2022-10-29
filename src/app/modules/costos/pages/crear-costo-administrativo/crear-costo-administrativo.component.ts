import { Component, OnInit } from '@angular/core';
import { FincasService } from 'src/app/modules/fincas/services/fincas/fincas.service';
import { ParametricasModel } from '@shared/models/parametricas.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ParametricasService } from '../../../shared/services/parametricas/parametricas.service';
import { AlertService } from '../../../shared/services/alert/alert.service';
import { CostosService } from '../../services/costos.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-crear-costo-administrativo',
  templateUrl: './crear-costo-administrativo.component.html',
  styleUrls: ['./crear-costo-administrativo.component.scss'],
})
export class CrearCostoAdministrativoComponent implements OnInit {

  formulario: FormGroup;
  mensajesFormulario: any = {};
  parametricas: ParametricasModel;
  listadoFincas: any[] = [];

  constructor(
    private fincasService: FincasService,
    private parametricasService: ParametricasService,
    private alertService: AlertService,
    private costosService: CostosService,
    private navController: NavController
  ) { }

  ngOnInit() {
    this.parametricas = this.parametricasService.param;
    this.formulario = this.crearFormulario();
    this.cargaParametricos();
  }

  cargaParametricos() {
    this.fincasService.getFincas().subscribe( resp => {
      this.listadoFincas = resp;
      // this.parametricasService.getParametricasFincas();
    });
  }
  private crearFormulario(): FormGroup {
    const formulario = new FormGroup({
      date: new FormControl( '', [] ),
      description: new FormControl( '', [Validators.required] ),
      type_cost_id: new FormControl( '2', [Validators.required] ),
      type_category_id: new FormControl( '', [Validators.required] ),
      farm_id: new FormControl( '', [Validators.required] ),
      stage_id: new FormControl( '', [Validators.required] ),
      amount: new FormControl( '', [Validators.required] ),
      unit_cost: new FormControl( '', [Validators.required] ),
      total_cost: new FormControl( '', [] ),
    });

    return formulario;
  }

  submit(){
    if (this.formulario.invalid ) {
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

  blurCantidad(){
    const temp = this.formulario.controls.amount.value * this.formulario.controls.unit_cost.value;
    this.formulario.controls.total_cost.setValue(temp);

  }
}
