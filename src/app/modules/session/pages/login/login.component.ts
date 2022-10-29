import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Mensajes } from 'src/app/modules/shared/enums/mensajes.enum';
import { AuthService } from '../../services/auth/auth.service';
import { SessionService } from '../../services/session/session.service';
import { AlertService } from '@shared/services/alert/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;
  mensajesFormulario: any = {};
  showPassword = true;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private authService: AuthService,
    private sessionService: SessionService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.formulario = this.crearFormulario();
  }

  mostrarPassword(): void {
    this.showPassword = !this.showPassword;
  }

  submit(){
    if ( this.formulario.invalid ){
      this.formulario.markAllAsTouched();
    } else {
      this.authService.login(this.formulario.getRawValue()).subscribe( resp => {
        this.alertService.activarLoading(false);
        this.sessionService.setSession(resp);
        this.formulario.reset();
        this.router.navigate(['dashboard/home']);
      }, err => {
          this.alertService.activarLoading(false);
          alert("Correo electrónico o contraseña errada")
          this.alertService.presentAlert('Correo electrónico o contraseña errada', ['Aceptar']);
        }
      );
    }
  }

  crearFormulario(): FormGroup {
    const formulario = new FormGroup({
      email: new FormControl( '', [ Validators.email , Validators.required ] ),
      password: new FormControl( '', [ Validators.required ] ),
    });
    this.crearMensajesReportante();
    return formulario;
  }

  protected crearMensajesReportante(): void {
    this.mensajesFormulario =  {
      email : [
        { error: 'required', message: Mensajes.required },
        { error: 'email', message: Mensajes.email }
      ],
      password : [
        { error: 'required', message: Mensajes.required},
      ],
    };
  }

  clear( control: string) {
    this.formulario.controls[control].reset();
  }

  loadPage( page: string ){
    this.router.navigate( [page] );
  }

}
