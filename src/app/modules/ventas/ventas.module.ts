import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { VentasRoutingModule } from './ventas-routing.module';

import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgregarVentasComponent } from './pages/agregar-ventas/agregar-ventas.component';
import { NgxCurrencyModule } from 'ngx-currency';

@NgModule({
    imports: [
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        VentasRoutingModule,
        SharedModule,
        NgxCurrencyModule
    ],
    declarations: [
        HomeComponent,
        AgregarVentasComponent
    ]

})

export class VentasModule {}
