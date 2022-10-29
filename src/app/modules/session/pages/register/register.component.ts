import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Mensajes } from 'src/app/modules/shared/enums/mensajes.enum';
import { RegisterService } from '../../services/register/register.service';
import { AlertService } from '../../../shared/services/alert/alert.service';
import { ModalController } from '@ionic/angular';
import { TerminosComponent } from '../../components/terminos/terminos.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  formulario: FormGroup;
  mensajesFormulario: any = {};

  public campoNombre: any = {
    textLabel: 'Nombres *'
  };

  listTiposDocumento: any[] = [
    { codigo: '1', nombre : 'Cédula de ciudadanía'},
    { codigo: '2', nombre : 'Cédula de extranjería'},
    { codigo: '3', nombre : 'NIT'},
  ];

  constructor(
    private router: Router,
    private registerService: RegisterService,
    private alertService: AlertService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.formulario = this.crearFormulario();
  }

  private crearFormulario(): FormGroup {
    const formulario = new FormGroup({
      tipoDocumento: new FormControl( '', [  Validators.required ] ),
      numeroDocumento: new FormControl( '', [  Validators.required ] ),
      nombres: new FormControl( '', [  Validators.required ] ),
      apellidos: new FormControl( '', [  Validators.required ] ),
      celular: new FormControl( '', [  Validators.required ] ),
      email: new FormControl( '', [  Validators.email,  Validators.required ] ),
      clave: new FormControl( '', [  Validators.required ] ),
      terminos: new FormControl( false , [  Validators.required ] ),
    });
    this.crearMensajesReportante();
    return formulario;
  }

  crearMensajesReportante(): void {
    this.mensajesFormulario =  {
      tipoDocumento : [{ error: 'required', message: Mensajes.required}],
      numeroDocumento : [{ error: 'required', message: Mensajes.required}],
      nombres : [{ error: 'required', message: Mensajes.required}],
      apellidos : [{ error: 'required', message: Mensajes.required}],
      celular : [{ error: 'required', message: Mensajes.required}],
      clave : [{ error: 'required', message: Mensajes.required}],
      email : [{ error: 'required', message: Mensajes.required }, { error: 'email', message: Mensajes.email }],
      password : [{ error: 'required', message: Mensajes.required}],
      terminos : [{ error: 'required', message: Mensajes.required}],
    };
  }

  submit(){
    if ( this.formulario.invalid ){
      this.formulario.markAllAsTouched();
    } else {
      this.alertService.activarLoading(true);
      this.registerService.registroUsuario(this.formulario.getRawValue()).subscribe( resp => {
        this.alertService.activarLoading(false);
        this.router.navigate(['auth/login']);
      }, err => {
        this.alertService.activarLoading(false);

        let msgError = '';

        // tslint:disable-next-line: forin
        for (const key in err.error.message) {
          console.log(key, err.error.message[key]);
          msgError += '<li>' + err.error.message[key] + '</li>';
        }


        this.alertService.presentAlert('Se produjo un error en el registro:<ul>' + msgError + '</ul>', ['Aceptar']);
      }) ;
    }
  }

  changeTipoDocumento( event: any  ){
    console.log(event.detail.value);

    if (event.detail.value === '3') {
      this.formulario.controls.apellidos.clearValidators();
      this.campoNombre.textLabel = 'Razón social *';
    } else {
      this.formulario.controls.apellidos.setValidators( Validators.required);
      this.campoNombre.textLabel = 'Nombres *';
    }
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: TerminosComponent,
      cssClass: 'my-custom-class',
      componentProps: {
      }
    });
    await modal.present();
  }

}
