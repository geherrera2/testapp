import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetalleFincaComponent } from './pages/detalle-finca/detalle-finca.component';
import { DetalleLoteComponent } from './pages/detalle-lote/detalle-lote.component';
import { DetalleAnalisisComponent } from './pages/detalle-analisis/detalle-analisis.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'detalle',
        component: DetalleFincaComponent
    },
    {
        path: 'lote/detalle/:id',
        component: DetalleLoteComponent
    },
    {
        path: 'lote/analisis/detalle/:id',
        component: DetalleAnalisisComponent
    }

];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class FincasRoutingModule {}