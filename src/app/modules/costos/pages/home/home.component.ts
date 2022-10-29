import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ParametricasModel } from '@shared/models/parametricas.model';
import { ParametricasService } from '../../../shared/services/parametricas/parametricas.service';
import { CostosService } from '../../services/costos.service';
import { AlertService } from '../../../shared/services/alert/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  formulario: FormGroup;
  mensajesFormulario: any = {};
  parametricas: ParametricasModel;

  constructor(
    private parametricasService: ParametricasService,
    private costosService: CostosService,
    private alertService: AlertService

  ) { }

  ngOnInit() {
    this.parametricas = new ParametricasModel();

    this.formulario = this.crearFormulario();
    this.alertService.activarLoading(true);
    this.costosService.getTipoCostos().subscribe( (data: any) =>  {
      this.alertService.activarLoading(false);
      this.parametricas.costType = data.data;
      this.parametricasService.getParametricasCostos();
    }, err => this.alertService.activarLoading(false));
  }

  private crearFormulario(): FormGroup {
    const formulario = new FormGroup({
      tipo_costo: new FormControl( '', [Validators.required] ),
    });

    return formulario;
  }

  

}
