import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AlertService } from '@shared/services/alert/alert.service';
import { HttpService } from '@shared/services/http/http.service';
import { ParametricasService } from '@shared/services/parametricas/parametricas.service';
import { SessionService } from 'src/app/modules/session/services/session/session.service';
import { InventarioService } from '../../services/inventario/inventario.service';

import { CrearProductoComponent } from './crear-producto.component';

describe('CrearProductoComponent', () => {
  let component: CrearProductoComponent;
  let fixture: ComponentFixture<CrearProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearProductoComponent ],
      providers:[
        ParametricasService,
        AlertService,
        InventarioService,
        HttpService,
        SessionService,
        Storage],
      imports: [IonicModule.forRoot(), HttpClientModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
