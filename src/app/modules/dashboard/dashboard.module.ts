import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { HomeComponent } from './pages/home/home.component';
import { TabsComponent } from './pages/tabs/tabs.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        DashboardRoutingModule,
        SharedModule
    ],
    declarations: [
        HomeComponent,
        TabsComponent
    ]
})

export class DashboardModule {}