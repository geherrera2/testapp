import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Mensajes } from '@shared/enums/mensajes.enum';
import { AlertService } from '../../../shared/services/alert/alert.service';
import { RegisterService } from '../../services/register/register.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent implements OnInit {

  formulario: FormGroup;
  mensajesFormulario: any = {};

  constructor(
    private alertService: AlertService,
    private registerService: RegisterService
  ) { }

  ngOnInit() {
    this.formulario = this.crearFormulario();
  }


  private crearFormulario(): FormGroup {
    const formulario = new FormGroup({
      email: new FormControl( '', [  Validators.email,  Validators.required ] ),
    });
    this.crearMensajesReportante();
    return formulario;
  }

  crearMensajesReportante(): void {
    this.mensajesFormulario =  {
      email : [{ error: 'required', message: Mensajes.required }, { error: 'email', message: Mensajes.email }],
    };
  }

  submit(){
    if ( this.formulario.invalid ){
      this.formulario.markAllAsTouched();
    } else {
      this.alertService.activarLoading(true);
      this.registerService.resetPassword(this.formulario.getRawValue()).subscribe( resp => {
        this.alertService.activarLoading(false);
        this.alertService.presentAlert('Verifica tu correo electrónico, se envió la información para cambio de contraseña', ['Aceptar']);
      }, err => {
        this.alertService.activarLoading(false);

        this.alertService.presentAlert('Se produjo un error en la socilitud', ['Aceptar']);
      }) ;
    }
  }
}
