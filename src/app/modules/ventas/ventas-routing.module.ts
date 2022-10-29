import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarVentasComponent } from './pages/agregar-ventas/agregar-ventas.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'agregar-venta',
        component: AgregarVentasComponent
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class VentasRoutingModule {}