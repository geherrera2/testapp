import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AnalisisService } from '../../services/analisis/analisis.service';
import { AlertService } from '../../../shared/services/alert/alert.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-detalle-analisis',
  templateUrl: './detalle-analisis.component.html',
  styleUrls: ['./detalle-analisis.component.scss'],
})
export class DetalleAnalisisComponent implements OnInit {

  detalleAnalisis: any;
  formulario: FormGroup;
  mensajesFormulario: any = {};
  parametricas: any;
  title = '';
  id = '';
  currentDate: any;

  constructor(
    private analisisService: AnalisisService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private navController: NavController
  ) {
    this.route.params.subscribe(params => {
      this.title  = params.name;
      this.id  = params.id;
    });
   }

  ngOnInit() {
    this.formulario = this.crearFormulario();
    this.analisisService.getDetalleAnalisis(this.id).subscribe( data => {
      this.detalleAnalisis = data;
      this.formulario.setValue(this.detalleAnalisis);
    });
    this.currentDate = moment(new Date()).format('YYYY-MM-DD');
  }

  private crearFormulario(): FormGroup {
    const formulario = new FormGroup({
      id: new FormControl( '', [Validators.required] ),
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
      lot_id: new FormControl( '', [Validators.required] ),
    });
    this.mensajesFormulario = this.analisisService.mensajesAnalisis();
    return formulario;
  }

  submit(){
    if (this.formulario.invalid ) {
      this.formulario.markAllAsTouched();
    } else {
      this.alertService.activarLoading(true);
      this.analisisService.actualizarAnalisis(this.formulario.getRawValue())
        .subscribe( (data: any) => {
          // this.lotesService.eventoActualizarLote(data.data);
          this.alertService.activarLoading(false);
          this.alertService.presentAlert('La información se actualizó correctamente', [
            {
              text: 'Aceptar',
              handler: () => {

              }
            }
          ], 'Registro actualizado');
        }, error => {
          this.alertService.activarLoading(false);
          this.alertService.presentAlert('Se produjo un error en el registro de la información', ['Aceptar']);
        });
    }
  }

  eliminar(){
    this.alertService.presentAlert('¿Está seguro de eliminar el análisis?', [
      {
        text: 'Cancelar',
        handler: () => {

        }
      },
      {
        text: 'Aceptar',
        handler: () => {
          this.alertService.activarLoading(true);
          this.analisisService.eliminarAnalisis(this.id).subscribe( data => {
            this.alertService.activarLoading(false);
            this.analisisService.eventoActualizarAnalisis(null);
            this.navController.back();
            this.alertService.presentToast('El lote fue eliminado.');
          }, err =>  {
            this.alertService.activarLoading(false);
          });
        }
      }
    ], 'Atención');
  }

}
