import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ReportesRoutingModule } from './reportes-routing.module';

import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewReportModalComponent } from './components/view-report-modal/view-report-modal.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ReportesRoutingModule,
        SharedModule
    ],
    declarations: [
        HomeComponent,
        ViewReportModalComponent
    ]

})

export class ReportesModule {}
