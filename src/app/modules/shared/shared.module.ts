import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { InputClearDirective } from './directives/input-clear/input-clear.directive';
import { MensajesErrorComponent } from './components/mensajes-error/mensajes-error.component';
import { InputClearComponent } from './components/input-clear/input-clear.component';
import { PopoverInfoComponent } from './components/popover-info/popover-info.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { SearchPipe } from './pipes/search/search.pipe';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        RouterModule
    ],
    declarations: [
        MensajesErrorComponent,
        InputClearComponent,
        InputClearDirective,
        PopoverInfoComponent,
        HeaderComponent,
        SearchPipe
    ],
    exports: [
        MensajesErrorComponent,
        InputClearComponent,
        PopoverInfoComponent,
        HeaderComponent,
        SearchPipe
    ]
})

export class SharedModule {}
