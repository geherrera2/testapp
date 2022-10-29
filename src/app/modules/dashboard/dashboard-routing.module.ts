import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TabsComponent } from './pages/tabs/tabs.component';
import { VentasRoutingModule } from '../ventas/ventas-routing.module';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'tabs',
        component: TabsComponent,
        children: [
            {
                path: 'fincas',
                loadChildren: () => import('../../modules/fincas/fincas.module').then( m => m.FincasModule)
            },
            {
                path: 'ventas',
                loadChildren: () => import('../../modules/ventas/ventas.module').then( m => m.VentasModule)
            },
            {
                path: 'costos',
                loadChildren: () => import('../../modules/costos/costos.module').then( m => m.CostosModule)
            },
            {
                path: 'inventario',
                loadChildren: () => import('../../modules/inventarios/inventarios.module').then( m => m.InventariosModule)
            },
            {
                path: 'reportes',
                loadChildren: () => import('../../modules/reportes/reportes.module').then( m => m.ReportesModule)
            },
            {
                path: '',
                redirectTo: '/dashboard/tabs/tab1',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class DashboardRoutingModule {}
