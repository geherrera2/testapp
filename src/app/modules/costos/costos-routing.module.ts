import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CrearCostoActividadComponent } from './pages/crear-costo-actividad/crear-costo-actividad.component';
import { CrearCostoAdministrativoComponent } from './pages/crear-costo-administrativo/crear-costo-administrativo.component';
import { DetalleCostoActividadComponent } from './pages/detalle-costo-actividad/detalle-costo-actividad.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'crear-actividad',
        component: CrearCostoActividadComponent
    },
    {
        path: 'crear-administrativo',
        component: CrearCostoAdministrativoComponent
    }
    ,
    {
        path: 'detalle-costo-actividad',
        component: DetalleCostoActividadComponent
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class CostosRoutingModule {}