import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearCostoAdministrativoComponent } from './crear-costo-administrativo.component';

describe('CrearCostoAdministrativoComponent', () => {
  let component: CrearCostoAdministrativoComponent;
  let fixture: ComponentFixture<CrearCostoAdministrativoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearCostoAdministrativoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearCostoAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
