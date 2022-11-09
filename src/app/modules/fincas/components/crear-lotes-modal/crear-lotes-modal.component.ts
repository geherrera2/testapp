import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AlertService } from '@shared/services/alert/alert.service';
import { LotesService } from '../../services/lotes/lotes.service';
import { ParametricasService } from '../../../shared/services/parametricas/parametricas.service';
import { ParametricasModel } from '../../../shared/models/parametricas.model';

import * as moment from 'moment';
import { Router } from '@angular/router';
import { GpsService } from '@shared/services/gps/gps.service';

@Component({
  selector: "app-crear-lotes-modal",
  templateUrl: "./crear-lotes-modal.component.html",
  styleUrls: ["./crear-lotes-modal.component.scss"],
})
export class CrearLotesModalComponent implements OnInit {
  @Input() idFinca: string;
  @Input() areaDisponible: number;

  formulario: FormGroup;
  mensajesFormulario: any = {};
  parametricas: ParametricasModel;
  currentDate: any;

  constructor(
    private alertService: AlertService,
    public modalController: ModalController,
    private lotesService: LotesService,
    private parametricasService: ParametricasService,
    private router: Router,
    public gpsService:GpsService
  ) { }

  ngOnInit() {
    this.parametricas = this.parametricasService.param;
    this.formulario = this.crearFormulario();
    this.currentDate = moment(new Date()).format("YYYY-MM-DD");
  }

  private crearFormulario(): FormGroup {
    const formulario = this.lotesService.createrFormLot(this.areaDisponible);

    this.mensajesFormulario = this.lotesService.mensajesLote();
    return formulario;
  }

  submit() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
    } else {
      this.alertService.activarLoading(true);
      this.lotesService.crearLote(this.formulario.getRawValue()).subscribe(
        (data: any) => {
          this.alertService.activarLoading(false);
          this.alertService.presentAlert('El lote se creó correctamente. ¿desea crear un análisis ?', [
            // {
            //   text: 'Aceptar',
            //   handler: () => {
            //     this.modalController.dismiss({datos: data.data});
            //   }
            // }
            {
              text: 'Cancelar',
              handler: () => {
                this.modalController.dismiss({datos: data.data});
              }
            },
            {
              text: 'Aceptar',
              handler: () => {

                const temp = this.areaDisponible - parseInt(this.formulario.controls.total_area.value);
                this.modalController.dismiss({datos: data.data});
                this.router.navigate([
                  'dashboard/tabs/fincas/lote/detalle/' + data.data.id,
                  { id: data.data.id, name: data.data.name, areaDisponible: temp, redirect: 'crear' }
                ]);
              }
            }
          ], 'Registro creado');
        }, error => {
          this.alertService.activarLoading(false);
          this.alertService.presentAlert('Se produjo un error en el registro de el lote', ['Aceptar']);
        });
    }
  }

  close(){
    this.modalController.dismiss({datos: null});
  }

}
