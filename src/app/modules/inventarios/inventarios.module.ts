import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { InventariosRoutingModule } from './inventarios-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './pages/home/home.component';
import { AgregarInventarioComponent } from './pages/agregar-inventario/agregar-inventario.component';
import { DetalleTipoComponent } from './pages/detalle-tipo/detalle-tipo.component';
import { AgregarProductoComponent } from './components/agregar-producto/agregar-producto.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { DetallaProductoComponent } from './pages/detalla-producto/detalla-producto.component';
import { NgxCurrencyModule } from "ngx-currency";


@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        InventariosRoutingModule,
        SharedModule,
        NgxCurrencyModule
    ],
    declarations: [
        HomeComponent,
        AgregarInventarioComponent,
        DetalleTipoComponent,
        AgregarProductoComponent,
        ProductosComponent,
        CrearProductoComponent,
        DetallaProductoComponent
    ],
    providers: [
        CurrencyPipe
    ]

})

export class InventariosModule {}
