import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FincasRoutingModule } from './fincas-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { DetalleFincaComponent } from './pages/detalle-finca/detalle-finca.component';
import { DetalleLoteComponent } from './pages/detalle-lote/detalle-lote.component';
import { CrearFincaModalComponent } from './components/crear-finca-modal/crear-finca-modal.component';
import { CrearLotesModalComponent } from './components/crear-lotes-modal/crear-lotes-modal.component';
import { CrearAnalisisModalComponent } from './components/crear-analisis-modal/crear-analisis-modal.component';
import { DetalleAnalisisComponent } from './pages/detalle-analisis/detalle-analisis.component';
import { NgxCurrencyModule } from 'ngx-currency';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FincasRoutingModule,
        SharedModule,
        NgxCurrencyModule
    ],
    declarations: [
        HomeComponent,
        DetalleFincaComponent,
        DetalleLoteComponent,
        DetalleAnalisisComponent,
        CrearFincaModalComponent,
        CrearLotesModalComponent,
        CrearAnalisisModalComponent
    ]

})

export class FincasModule {}