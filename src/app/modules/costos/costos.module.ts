import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CostosRoutingModule } from './costos-routing.module';

import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeAdministrativoComponent } from './components/home-administrativo/home-administrativo.component';
import { HomeActividadComponent } from './components/home-actividad/home-actividad.component';
import { CrearInsumoComponent } from './components/crear-insumo/crear-insumo.component';
import { CrearCostoActividadComponent } from './pages/crear-costo-actividad/crear-costo-actividad.component';
import { CrearCostoAdministrativoComponent } from './pages/crear-costo-administrativo/crear-costo-administrativo.component';
import { DetalleCostoActividadComponent } from './pages/detalle-costo-actividad/detalle-costo-actividad.component';
import { NgxCurrencyModule } from 'ngx-currency';

@NgModule({
    imports: [
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        CostosRoutingModule,
        SharedModule,
        NgxCurrencyModule
    ],
    declarations: [
        HomeComponent,
        HomeAdministrativoComponent,
        HomeActividadComponent,
        CrearCostoActividadComponent,
        CrearInsumoComponent,
        CrearCostoAdministrativoComponent,
        DetalleCostoActividadComponent
    ]

})

export class CostosModule {}
