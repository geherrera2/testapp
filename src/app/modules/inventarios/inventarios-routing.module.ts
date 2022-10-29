import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AgregarInventarioComponent } from './pages/agregar-inventario/agregar-inventario.component';
import { DetalleTipoComponent } from './pages/detalle-tipo/detalle-tipo.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { DetallaProductoComponent } from './pages/detalla-producto/detalla-producto.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'agregar',
        component: AgregarInventarioComponent
    },
    {
        path: 'detalle-tipo',
        component: DetalleTipoComponent
    }
    ,
    {
        path: 'productos',
        component: ProductosComponent
    },
    {
        path: 'detalle-producto',
        component: DetallaProductoComponent
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class InventariosRoutingModule {}
