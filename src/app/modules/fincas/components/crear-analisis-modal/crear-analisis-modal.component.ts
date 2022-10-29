import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AnalisisService } from '../../services/analisis/analisis.service';
import { AlertService } from '../../../shared/services/alert/alert.service';
import * as moment from 'moment';

@Component({
  selector: 'app-crear-analisis-modal',
  templateUrl: './crear-analisis-modal.component.html',
  styleUrls: ['./crear-analisis-modal.component.scss'],
})
export class CrearAnalisisModalComponent implements OnInit {

  @Input() idLote: string;

  formulario: FormGroup;
  mensajesFormulario: any = {};
  parametricas: any;
  currentDate: any;

  constructor(
    public modalController: ModalController,
    private analisisService: AnalisisService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.formulario = this.crearFormulario();
    this.currentDate = moment(new Date()).format('YYYY-MM-DD');
  }

  close(){
    this.modalController.dismiss();
  }

  private crearFormulario(): FormGroup {
    const formulario = new FormGroup({
      analysis_date: new FormControl( '', [Validators.required] ),
      ph: new FormControl( '', [] ),
      organic_matter: new FormControl( '', [] ),
      phosphates: new FormControl( '', [] ),
      calcium: new FormControl( '', [] ),
      magnesium: new FormControl( '', [] ),
      potassium: new FormControl( '', [] ),
      aluminum: new FormControl( '', [] ),
      sulphur: new FormControl( '', [] ),
      texture: new FormControl( '', [] ),
      lot_id: new FormControl( this.idLote, [] ),
    });
    this.mensajesFormulario = this.analisisService.mensajesAnalisis();
    return formulario;
  }

  private crearMensajes(){

  }

  submit(){
    if (this.formulario.invalid ) {
      this.formulario.markAllAsTouched();
    } else {
      this.alertService.activarLoading(true);
      this.analisisService.crearAnalisis(this.formulario.getRawValue())
        .subscribe( (data: any) => {
          this.alertService.activarLoading(false);
          this.alertService.presentAlert('La información se creó correctamente', [
            {
              text: 'Aceptar',
              handler: () => {
                this.modalController.dismiss({datos: data.data});
              }
            }
          ], 'Registro creado');
        }, error => {
          this.alertService.activarLoading(false);
          this.alertService.presentAlert('Se produjo un error en el registro de la información', ['Aceptar']);
        });
    }
  }

}
