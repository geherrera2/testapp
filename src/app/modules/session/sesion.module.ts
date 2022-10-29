import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SesionRoutingModule } from './sesion-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotComponent } from './pages/forgot/forgot.component';
import { TerminosComponent } from './components/terminos/terminos.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SesionRoutingModule,
        SharedModule
    ],
    declarations: [
        LoginComponent,
        RegisterComponent,
        ForgotComponent,
        TerminosComponent
    ]
})
export class SesionModule {}
